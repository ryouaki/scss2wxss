# scss2wxss
一个用于自动根据scss生成wxss文件转化插件

## 安装
在vscode插件市场搜索scss2wxss。然后点击安装即可

## 使用
在当前工程下创建scss文件。当每次保存的时候会自动根据该文件对应目录生成对应的wxss文件。

但是对于一些模块文件并不需要单独生成wxss文件的，需要以`_`开头作为文件名。比如`_xxx.scss`。

```scss
  // a.scss
  a {
    font-size: 12rpx;
  }

  // _c.scss
  c {
    font-weight: 100;
  }

  // b.scss
  @use 'a.scss';

  @use '_c.scss';

  b {
    font-size: 12rpx;
  }
```

输出
```wxss
  // a.wxss
  a {
    font-size: 12rpx;
  }

  // b.wxss
  a {
    font-size: 12rpx;
  }

  c {
    font-weight: 100;
  }

  b {
    font-size: 12rpx;
  }
```

## 注意

目前没有做屏蔽和选择控制。只要安装了插件就会默认根据scss生成wxss。如果感兴趣可以提PR。

官方已经不建议使用@import语法。切记。