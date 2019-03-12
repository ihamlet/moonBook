onmessage = function (e) {
    var res = e.data + "帅气！";
    postMessage(res);
    this.close();//关闭子进程
}