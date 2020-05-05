# 使用命令行

## 简述
ES 内置了一门简单的语言, 可以比较高自由度地精细地操控每一个功能.

调用方式为
```bash
./ExtractorSharp.exe -m <命令>
```

::: warning
- 使用本功能需要对任意 *C 系编程语言* 和 *Windows 命令行* 有一些了解, 并且以下文档默认读者了解这些.
- 本功能尚不完善, 可能会有未知 bug.
- 本功能可能会快速迭代, 无法保证文档实时更新, 但尽量保证向后兼容.
- 相关代码在`ExtractorSharp/Core/CommandParser.cs`, 一切以此为准
:::

*最近更新: 2020/05/03*

## 语言快速入门
此语言非常简略, 大部分时候形如:
```python
1,2,3|toArray|toInt|asVar|a;
1|toInt|addOne|addOne|addOne|asVar|b;
|useVar|b|addOne;

@{
    replaceImage;
    ...;
    ...;
}
```
代码从左到右从上到下执行, 以`|`为分界符, `|`前的通常是操作数, 其后是命令, 代码行以分号结尾. 

### 命令
这对应于 GO 的接口, 允许链式调用.
```Python
1|toInt|addOne|addOne|addOne;
|useVar|b|addOne;
```
可视为
```Python
"1".toInt().addOne().addOne().addOne();
b.addOne();
```
*所有的内置命令见[下表](/guide/developer/command.html#内置命令). *

聪明的你一定发现`1`对应成了`"1"`, 请看[数据类型](#).

### 数据类型
语言基础数据类型仅有: 
- 字符串, 写出来的默认就是字符串, 如`asdsdfgsd`, `字符串`, `123`, `987.123`. 只有字符串能够直接表示. 
- 整数, 整数只能通过命令构造, `123|toInt` => `"123".toInt()`.
- 数组, 允许任意类型数组, 但是原生的构造方法只有`1,2,3|toArray` => `"1,2,3".split(',')`, 暂时不支持直接索引数组. 

但是也支持
- 原生 C# 对象, 一般是调用 API 的返回值

### 变量使用
构造变量使用`值|asVar|名`, 如`1|asVar|one`即`var one = 1`.  
使用变量使用`|useVar|名`, 如`|useVar|one`即`$one`.

变量总是全局的, 没有作用域, 变量可以重复构造, 即
```Python
1|asVar|one;
one|addOne|asVar|one;
# one -> 2
```
::: warning
代码目前没有注释功能. 
:::

变量使用过程允许使用 C# 变量的`字段/属性/方法`, 如
```Python
1|toInt|asVar|one; # var one = int.Parse("1");
|useVar|one.ToString(); # $one.ToString();

sprite_character_challenge2nd_gunner_launcher.NPK|LoadFile|asVar|albums;
# var albums =  LoadFile("sprite_character_challenge2nd_gunner_launcher.NPK");
|useVar|albums.Length; # $albums.Length;
```
::: warning
useVar 暂时不支持传参, 可以`a.ToString()`, 但是不能`b.GetValue(0)`.
:::

### 流程控制
暂时没有判断, 只有一个`forEach`.

#### forEach: 
```Python
sprite_character_challenge2nd_gunner_launcher.NPK|LoadFile|asVar|albums;
|useVar|albums|forEach|album{
    |useVar|album.Name|message;
}
```
相当于
```python
var albums = LoadFile("sprite_character_challenge2nd_gunner_launcher.NPK");
albums.forEach(album => {
    message(album.Name);
})
# 或者
foreach (var album in albums){
    message(album.Name);
}
```

### 调用 ES Action
ES 将各个动作抽象为 Action, 这也是本项目得以快速使用的重要原因. 

#### Action
Action 继承自`ICommand`, 包含
```C#
string Name { get; }

/// <summary>
///     可否撤销
/// </summary>
/// <returns></returns>
bool CanUndo { get; }

/// <summary>
///     是否对文件有实质影响
/// </summary>
/// <returns></returns>
bool IsChanged { get; }

/// <summary>
///     执行
/// </summary>
void Do(params object[] args);

/// <summary>
///     撤销
/// </summary>
void Undo();

/// <summary>
///     重做
/// </summary>
void Redo();
```
使用 Action 的过程即拼凑 args 数组, 然后调用 Do. 
所有的 Action 可以在 [Github](/https://github.com/myuanz/ExtractorSharp/blob/master/ExtractorSharp/Program.cs#L98) 看到, 欲知传参方式则直接跳转对应文件查看 Do 的处理过程即可, 更详细的 API 文档待完善. 

这里推荐下函数断点来查看参数.

*TODO: 在界面一键导出一组动作*

#### 语法
调用 Action 的语法为: 
```Python
@{
    saveImage;
    |useVar|album;
    1|toInt;
    1|toArray|toInt;
    Z:\output;
    "";
    0|toInt;
    0|toInt;
    false|toBool;
    |asNull;
    true|toBool;
}
```
`saveImage`是 ES 的一个动作, 用于导出`album`的所有贴图, 其余即按顺序填充函数参数. 

一个文件对应许多`album`, `albums`即打开页面后左侧的那块区域中的`.img`, 见[此处](http://localhost:8080/guide/file/delete-file.html#%E5%88%A0%E9%99%A4%E6%96%87%E4%BB%B6)

## 示例
本示例演示了导出一个 NPK 文件的贴图后, 将贴图内容置换为随机色块后再另存为新的 NPK 文件的流程.
```powershell
$cmd_export = @"
D:\WeGameApps\地下城与勇士\ImagePacks2\sprite_character_challenge2nd_gunner_launcher.NPK|LoadFile|asVar|albums;
useVar|albums|forEach|album|{
	@{
		saveImage; 
		|useVar|album;
		1|toInt;
		1|toArray|toInt;
		Z:\output;
		"";
		0|toInt;
		0|toInt;
		false|toBool;
		|asNull;
		true|toBool;
	}
}
0|exit;
"@

$cmd_replace_and_save = @"
D:\WeGameApps\地下城与勇士\ImagePacks2\sprite_character_challenge2nd_gunner_launcher.NPK|LoadFile|asVar|albums;
useVar|albums|forEach|album|{
	@{
		replaceImage; 
		0|toInt;
		false|toBool;
		2|toInt;
		Z:\output\|Concat|useVar|album.Name;
		|useVar|album;
		|asNull;
	}
}

@{
	saveImg; 
	|useVar|albums;
	Z:\output\|Concat|sprite_character_challenge2nd_gunner_launcher.NPK;
	2|toInt;
}
0|exit;

"@

C:\Users\Administrator\Desktop\ExtractorSharp\ExtractorSharp\bin\Release\ExtractorSharp.exe -m  $cmd_export | Wait-Process
python .\img_to_black.py 
C:\Users\Administrator\Desktop\ExtractorSharp\ExtractorSharp\bin\Release\ExtractorSharp.exe -m  $cmd_replace_and_save | Wait-Process
```

```Python
# img_to_black.py
import cv2
import os
import numpy as np

for path in os.listdir("./"):
    if os.path.isdir(path):
        for filename in os.listdir(f"./{path}"):
            filepath = f"./{path}/{filename}"
            print(filepath)
            img = cv2.imread(filepath)
            img[:] = np.random.randint(0, 255, (1,3))
            cv2.imwrite(filepath, img)
```

## 内置命令
::: tip
更多内置命令的示例参见`ExtractorSharp.UnitTest/Command/UnitTest1.cs`
:::
::: danger
以下示例都没有添加分号[;]作为结尾
:::

### asNull
获得一个`null`

例:
```python
1|asNull # null
|asNull # null
```
### addOne
将前值喜加一

例:
```python
1|toInt|addOne # 2
1|toInt|addOne|addOne # 3
```
### toBool
将前值转换为逻辑型. 
判断逻辑为`arg.CurrentArg as string != "false"`
所以除了`"false"`, 其余全是`true`

例:
```python
1|toBool # true
0|toBool # true
1|asNull|toBool # true

false|asNull # false
```
### toArray
将数据转换到数组, 要求数据以逗号分隔. 

例:
```python
1,2,3|toArray # [1, 2, 3]
```
### toInt
字符串会转换为整数, 字符串数组会转换为整数数组

### LoadFile
导入一个文件, 由于此动作并未在 Action 中定义, 因此我将其加入了语言内置命令

例:
```python
sprite_character_challenge2nd_gunner_launcher.NPK|LoadFile; # 返回 Album[]
```

### exit
以某个状态码退出

例:
```python
0|exit # Environment.Exit(0);
1|toInt|exit # Environment.Exit(1);
```

### message
弹出一个消息框用于提示. 

例:
```python
1|message # MessageBox.Show("1");
```
### asVar
构造变量, 详细见上部[变量使用](#)

### useVar
使用变量, 详细见上部[变量使用](#)

### asEnvVar
设置环境变量, 用法同`asVar`

### useEnvVar
使用环境变量, 用法同`useVar`

例: 
```C#
Assert.AreEqual(null, commandParser.InvokeToken("|useEnvVar|testEnv;"));
Assert.AreEqual("qaerfqaw", commandParser.InvokeToken("qaerfqaw|asEnvVar|testEnv;"));
Assert.AreEqual("qaerfqaw", commandParser.InvokeToken("|useEnvVar|testEnv;"));
Assert.AreEqual("qaerfqaw", Environment.GetEnvironmentVariable("testEnv"));
```

### forEach
循环, 详细见上部[流程控制](#)

### @
调用 Action, 详细见上部[调用 ES Action](#)

### Concat
连接字符串或者数组.

例:
```python
6|Concat|1 # "61"
1|asVar|a
|useVar|a|Concat|2 # "62"

1,2,3|toArray|asVar|a
|useVar|a|toInt|Concat|4|toInt|addOne|addOne # [1, 2, 3, 6]
```
::: warning
Concat 在连接向量和标量的时候, 只允许左侧向量, 右侧标量, 因此
```python
4|toInt|addOne|addOne|Concat|useVar|a|toInt
```
不等于`[6, 1, 2, 3]`
:::