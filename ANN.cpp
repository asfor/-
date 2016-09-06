#include <math.h>
#include <stdlib.h>
#include <iostream>
#include <fstream.h>
#include <iomanip.h>
#include <malloc.h>
#include <complex>

using namespace std;

#define SIZE 512    //非0频域元素个数

int main() {
    double dest[1] = {0};       // 原始信号的类型, 期望值
    complex<double> td[SIZE];   // 时域, 在原始信号上的离散采集值
    complex<double> fd[SIZE];   // 频域, 单位Hz
    int invisible = floor(sqrt(SIZE + 1)) + 1;  // 隐藏层节点数
    ANN ann = new ANN(SIZE, invisible, 1);      // ANN对象

    if(FFT(&td, &fd, SIZE))         // 求得信号的频域
        ann.TrainOneCase(fd, dest); // 使网络对该学习样本进行学习
}

/*
** 一维快速傅里叶变换
**
** complex<double> * TD  指向时域数组的指针
** complex<double> * FD  指向频域数组的指针
** r                     2的幂数，即迭代次数
*/
bool FFT(complex<double> * TD, complex<double> * FD, int r) {
    LONG count;     // 傅里叶变换点数
    int i,j,k;      // 循环变量
    int bfsize,p;   // 中间变量
    double angle;   // 角度
    complex<double> *W,*X1,*X2,*X;
    count = 1 << r; // 计算傅里叶变换点数为1左移r位

    W = new complex<double>[count / 2];
    X1 = new complex<double>[count];
    X2 = new complex<double>[count]; // 分配运算所需存储器
    
    // 计算加权系数（旋转因子w的i次幂表）
    for(i = 0; i < count / 2; i++) {
        angle = -i * PI * 2 / count;
        W[ i ] = complex<double> (cos(angle), sin(angle));
    }

    // 将时域点写入X1
    memcpy(X1, TD, sizeof(complex<double>) * count);

    // 采用蝶形算法进行快速傅里叶变换
    for(k = 0; k < r; k++) {
        for(j = 0; j < 1 << k; j++) {
            bfsize = 1 << (r-k);
            for(i = 0; i < bfsize / 2; i++) {
                p = j * bfsize;
                X2[i + p] = X1[i + p] + X1[i + p + bfsize / 2] * W[i * (1<<k)];
                X2[i + p + bfsize / 2] = X1[i + p] - X1[i + p + bfsize / 2] * W[i * (1<<k)];
            }
        }

        X = X1;
        X1 = X2;
        X2 = X;
    }

    // 重新排序
    for(j = 0; j < count; j++) {
        p = 0;
        for(i = 0; i < r; i++) {
            if (j&(1<<i)) {
                p+=1<<(r-i-1);
            }
        }
        FD[j]=X1[p];
    }

    // 释放内存
    delete W;
    delete X1;
    delete X2;
    return true;
}

class ANN {

private:
    bool useMethod;   //动量项标志

    double Rate;     //学习率

    int layer1;      //输入层结点数
    int layer2;      //中间层结点数
    int layer3;      //输出层结点数 

    double *Out_1;      //第一层输出
    double *Out_2;      //第二层输出
    double *Out_3;      //第三层输出
    double *Dest;        //期望输出

    double **Weight_1;     //权值矩阵
    double **Weight_2;

    double **SWeight_1;    //第一层权值的改变量  动量项
    double **SWeight_2;    //第二层权值的改变量  动量项
    
    double *S2;     //辅助变量
    double *S3;		//辅助变量

    double **G1;  //第一层权值距阵各分量偏导  
    double **G2;  //第二层权值距阵各分量偏导  

//初始化函数定义, init
public:
	//构造函数
    ANN() 
    {

        Out_1 = Out_2 = Out_3 = Dest = NULL;
        Weight_1 = Weight_2 = NULL;
        SWeight_1 = SWeight_2 = NULL;
        S3 = S2 = NULL;
        G1 = G2 = NULL;    
        
        SetMethod();
    }

    // 构造函数，输入参数为3层BP网络每层的结点数。
    // 在此函数中进行内存分配等初始化工作
    ANN(int input, int middle, int output) 
    {
        SetLayerNodeCount(input, middle, output);
        SetMethod();
    }
    
    //析构函数
    ~ANN()
    {FreeMemory();}

    //删除所有变量
    void FreeMemory() 
    {
        delete[] Out_1;
        delete[] Out_2;
        delete[] Out_3;
        delete[] Dest;

        free2D(Weight_1);
        free2D(Weight_2);
        free2D(SWeight_1);
        free2D(SWeight_2);

        delete[] S2;
        delete[] S3;

        free2D(G1);
        free2D(G2);
    }

    //初始化3层网络
    void SetLayerNodeCount(int input, int middle, int output)
    {
        FreeMemory();

        layer1 = input + 1;		//输入层结点数
        layer2 = middle;		//中间层结点数
        layer3 = output;		//输出层结点数 

        Out_1  = new double[layer1];
        Out_2  = new double[layer2];
        Out_3  = new double[layer3];
        Dest = new double[layer3];

        Weight_1  = malloc2D(layer2, layer1);
        Weight_2  = malloc2D(layer3, layer2);
        SWeight_1 = malloc2D(layer2, layer1);
        SWeight_2 = malloc2D(layer3, layer2);
    
        S2  = new double[layer2];
        S3  = new double[layer3];

        G1 = malloc2D(layer2, layer1);
        G2 = malloc2D(layer3, layer2);
    
        initial(); 
    }

    double ** malloc2D(int nW, int nH)
    {
        double ** pLineHead=(double **)malloc(nH*sizeof(double *));
        double * pMem=(double *)malloc(nW*nH*sizeof(double));

        for(int i=0; i<nH; i++)
        {pLineHead[i]=(double *)((BYTE *)pMem+nW*i*sizeof(double));}
        
        return pLineHead;
    }

    void free2D(double  ** & pLineHead)
    {
        if(pLineHead)
        {    
            free(pLineHead[0]);    
            free(pLineHead);
        }    
    }

    //设置动量项标志
    void SetMethod(bool method = false)
    {useMethod = method;}	//是否使用动量项标志

//私有模型函数定义, module
private:

    //用随机数初始化权值
    void initial()
    {
        for(int i = 0; i < layer1; i++)
        for(int j = 0; j < layer2; j++)
        {
            Weight_1[i][j] = (double)(rand() % 2000 - 1000) / 1000;	//(-1,1)
            if(Weight_1[i][j] == 0) Weight_1[i][j] = 0.1;
        }
            
        for(int i = 0; i < layer2; i++)
        for(int j = 0; j < layer3; j++)
        {
            Weight_2[i][j] = (double)(rand() % 2000 - 1000) / 1000;
            if(Weight_2[i][j] == 0) Weight_2[i][j] = 0.1;
        }
    }

    //阶跃激励函数
    int sgn(double i)
    {
        if(i > 0) return 1;
        if(i < 0) return -1;
        return 0;
    }

   //sigmoid 函数, 即S型曲线激励函数
    double func(double i)
    {
        //return (double)((1 - exp(-i)) / (1 + exp(-i)));
        if(i < -45)	return 0;      
        if(i > 45) 	return 1;
        return 1.0 / (1.0 + exp(-i));        
    }

    //计算各层输出Out_1[], Out_2[], Out_3[]
    void ComputeY()
    {
        int i;

        for(int i = 0; i < layer2; i++)
        {    
            Out_2[i] = 0;
            
            for(int j = 0; j < layer1; j++)
            	Out_2[i] += Out_1[j] * Weight_1[j][i];
            
            Out_2[i] = func(Out_2[i]);                      
        }    
    
        
        for(int i = 0; i < layer3; i++)
        {            
            Out_3[i] = 0;

            for(int j = 0; j < layer2; j++)
            	Out_3[i] += Out_2[j] * Weight_2[j][i];
            
            Out_3[i] = func(Out_3[i]);                   
        }
    }
    
    //计算误差对各层矩阵的偏导，求得梯度信息
    void ComputeG()
    {
        int i,j;
        
        for(int i = 0; i < layer3; i++)
        {S3[i] = (Dest[i] - Out_3[i]) * (1 - Out_3[i]) * Out_3[i];}
        
        for(int i = 0; i < layer2; i++)
        {
            S2[i] = 0;
            
            for(int j = 0; j < layer3; j++)
            	S2[i] += Weight_2[i][j] * S3[j];
            
            S2[i] *= (1 - Out_2[i]) * Out_2[i];
        }

        for(int i = 0; i < layer1; i++)
        for(int j = 0; j < layer2; j++)
            G1[i][j] = Out_1[i] * S2[j];
                    
        for(int i = 0; i < layer2; i++)
        for(int j = 0; j < layer3; j++) 
            G2[i][j] = Out_2[i] * S3[j];    
    }
        
    //按梯度方向修正权值
    void WeightAdapt()
    {
    	int i, j;
        //不使用动量项改进
        if(useMethod == false)
        {
            for(int i = 0; i < layer2; i++)
            for(int j = 0; j < layer3; j++)
                Weight_2[i][j] += Rate * G2[i][j];

            for(int i = 0; i < layer1; i++)
            for(int j = 0; j < layer2; j++)
                Weight_1[i][j] += Rate * G1[i][j];
        }

        //使用动量项改进 此方式只有对同一个样本训练的次数大于1时有用
        if(useMethod == true)
        {
            for(int i = 0; i < layer2; i++)
            for(int j = 0; j < layer3; j++)
            {
                Weight_2[i][j] += Rate * G2[i][j] + 0.5 * Rate * SWeight_2[i][j];
                SWeight_2[i][j] = Rate * G2[i][j];
            }
                
            for(int i = 0; i < layer1; i++)
            for(int j = 0; j < layer2; j++)
            {
                Weight_1[i][j] += Rate * G1[i][j] + 0.5 * Rate * SWeight_1[i][j]; 
                SWeight_1[i][j] = Rate * G1[i][j];
            }
        }
    }

//公共调用函数定义, controller
public:
    
    /*	
    **	学习模式，多次使用网络来修正自身权值
    **	
    **	Input[]			输入数组	
    **	Out[]			期望数组
    **	Error           可接受的结果与期望误差最大值
    **	LimitTrainCount 最大训练次数
    */
    double TrainOneCase(double Input[], double Out[], double Error = 0.000001, int LimitTrainCount = 500)
    {
        int i,j;

        //动量项初始化
        if(useMethod == true)
        {
            for(int i = 0; i < layer1; i++)
            for(int j = 0; j < layer2; j++)
                SWeight_1[i][j] = 0;
                
            for(int i = 0; i < layer2; i++)
            for(int j = 0; j < layer3; j++)
                SWeight_2[i][j] = 0;
        }

        //域值对应的输入
        Out_1[layer1 - 1] = -1;

        for(int i = 0; i < layer1 - 1; i++)
        	Out_1[i] = Input[i];

        for(int i = 0; i < layer3; i++)
        	Dest[i] = Out[i];

        double TrainError;	//误差指标
		
		//设置初始学习率    
        Rate=0.3; 

        do
        {
            ComputeY();		//计算输出
            ComputeG();		//计算偏差
            WeightAdapt();	//调整权值
            
            TrainError = 0;

            for(int i = 0; i < layer3; i++)
            	TrainError += (Dest[i] - Out_3[i]) * (Dest[i]-Out_3[i]) / 2;

            Rate = 0.05 + TrainError / 5;   //根据误差自适应修改学习率
        }
        while(TrainError > Error && --LimitTrainCount < 0);

        //返回误差
        return TrainError;
    }

    //测试模式，单次使用网络，不启用学习功能，用于测试网络是否已合格
    double ComputeError(double Input[],double Out[])
    {
        double TrainError = 0;
        int i;

        Out_1[layer1 - 1] = -1;
        
        for(int i = 0; i < layer1 - 1; i++)
        	Out_1[i] = Input[i];

        for(int i = 0; i < layer3; i++)
        	Dest[i] = Out[i];
        
        ComputeY();        
        
        for(int i = 0; i < layer3; i++)
        	TrainError += (Dest[i] - Out_3[i]) * (Dest[i] - Out_3[i]) / 2;

        return TrainError;         //返回误差
    }

    //Out[]即为输出结果
    int DecideOneCase(double Input[], double Out[])
    {
        Out_1[layer1 - 1] = -1;
        
        for(int i = 0; i < layer1 - 1; i++)
        	Out_1[i] = Input[i];

        ComputeY();

        double max=0;	//最大输出
        int    index=0;	//最大输出索引

        for(int i = 0; i < layer3; i++) 
        {
            Out[i] = Out_3[i];

            if(Out_3[i] > max) 
            {
                max=Out_3[i];
                index=i;
            }
        }
        return index;
    }
};