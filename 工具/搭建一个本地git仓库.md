# 前期操作

1. 在你想要创建仓库滴符盘创建一个文件夹，右键属性，对用户完全控制

2. 右键Git create repository here创建仓库

3. 在属性点击共享，可以看见有一个共享的网络路径

4. 在其他盘符创建一个目录

   ```
   git init
   git add *
   git commit -m "test"
   git remote add rootRep D:\AllGitRepository\  # 添加仓库地址
   git push --set-upstream F:gitStore master
   ```

5. 在根仓库(D盘目录)下执行以下命令:

   ```
   git config --global receive.denyCurrentBranch ignore
   ```

6. 修改根仓库.git/hooks/post-update.sample文件，在最下边添加以下代码：

```\
# exec gic update-server-info
upset GIT_DIR
cd ..
git checkout -f
```

之后就可以在C盘的仓库中做提交了：

```
git push -u rootRep master
```

远程仓库和本地仓库就关联好了。之间可以push和pull。





# 下载工具

## 1. [panDownload](https://pandownload.com/#)网盘