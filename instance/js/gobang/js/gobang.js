// 画棋盘格子
function drawGobang(n) {

    for (var i = 0; i < n; i++) {

        for (var j = 0; j < n; j++) {

            var block = document.createElement("div");

            block.className = "gobang_block";
            block.id = "block_" + i + "_" + j;
            gobang.appendChild(block);

            if (i == 0) {
                block.className += " top";
            }
            if (i == n - 1) {
                block.className += " bottom";
            }
            if (j == 0) {
                block.className += " left";
            }
            if (j == n - 1) {
                block.className += " right";
            }

        }

    }

}

// 画棋子
function drawPiece() {

    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event),
        targetId = target.id,
        a = +targetId.split("_"),
        i = +targetId.split("_")[1],
        j = +targetId.split("_")[2];


    if (targetId != "gobang_main") {

        if (target.className.indexOf("active") < 0) {   // 已经下过的棋盘位置不可再下

            target.className = target.className + " active " + color; // 画当前棋子

            if (gobangArr[i]) {
                gobangArr[i][j] = color; // 存棋盘的数据
                chessWin(i, j, color); // 判断是否赢
            } else {
                alert("错误 " + target.id + " " + a + " " + i + " " + j);
            }

            color = color == "black" ? "white" : "black";  // 下次画另外一种颜色的棋子
            if (!win) {
                logStatus(color); // 设置提醒文本
            }

        }

    }

}

// 提醒文本
function logStatus(info) {

    if (color == "black") {
        gobangStatus.innerHTML = "<p>轮到黑棋下</p>";
    } else {
        gobangStatus.innerHTML = "<p>轮到白棋下</p>";
    }

}

// 判断输赢
function chessWin(i, j, color) {

    var row, col,
        count = 1;  // 连续同一个颜色棋子的个数


    // 垂直方向
    for (row = i - 1; row >= 0 && row > i - 5; row--) {

        if (gobangArr[row] && gobangArr[row][j] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    for (row = i + 1; row < n && row < i + 5; row++) {

        if (gobangArr[row] && gobangArr[row][j] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    count = 1;


    // 水平方向
    for (col = j - 1; col >= 0 && col > j - 5; col--) {

        if (gobangArr[i] && gobangArr[i][col] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    for (col = j + 1; col < n && col < j + 5; col++) {

        if (gobangArr[i] && gobangArr[i][col] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    count = 1;

    // 45°方向
    for (row = i - 1, col = j - 1; row >= 0 && col >= 0 && row > i - 5 && col > j - 5; row--, col--) {


        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    for (row = i + 1, col = j + 1; row < n && col < n && row < i + 5 && col < j + 5; row++, col++) {


        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    count = 1;

    // 135°方向
    for (row = i - 1, col = j + 1; row >= 0 && col < n && row > i - 5 && col < j + 5; row--, col++) {

        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    for (row = i + 1, col = j - 1; row < n && col >= 0 && row < i + 5 && col > j - 5; row++, col--) {


        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else {
            break;
        }

    }
    count = 1;

}


function ifWin(count, color) {
    if (count == 5) {
        if (color == "black") {
            gobangStatus.innerHTML = "<p>黑棋赢了</p>";
            alert("黑棋赢了");
        } else {
            gobangStatus.innerHTML = "<p>白棋赢了</p>";
            alert("白棋赢了");
        }
        win = true;
        EventUtil.removeHandler(gobang, "click", drawPiece);

    } else {
        win = false;
    }
}


// 重置数据，再来一盘
function resetGobang() {

    var i, j;

    // 清除数组数据
    for (i = 0; i < n; i++) {
        var tempData = [];
        for (j = 0; j < n; j++) {
            tempData.push("");
        }
        gobangArr[i] = tempData;
    }

    // 设置默认数据
    color = "black";
    gobangStatus.innerHTML = "<p>默认黑子先下</p>";
    EventUtil.addHandler(gobang, "click", drawPiece);


    // 清除棋子
    var divClassName,
        divGroup = gobang.getElementsByTagName("div"),
        len = divGroup.length;

    for (i = 0; i < len; i++) {

        if (typeof(divGroup[i]) == "object") {
            divClassName = divGroup[i].getAttribute("class");

            if (typeof(divClassName) == "string") {

                if (divClassName.indexOf("active white") > 0) {
                    divClassName = divClassName.replace("active white", "");
                    divGroup[i].setAttribute("class", divClassName);
                }
                if (divClassName.indexOf("active black") > 0) {
                    divClassName = divClassName.replace("active black", "");
                    divGroup[i].setAttribute("class", divClassName);
                }

            }

        }

    }

}


var n = 15,  // 棋盘
    color = "black", // 默认黑棋先下
    gobangArr = [],  // 存储棋盘的数据
    win = false,  // 棋子赢的数组
    gobang = document.getElementById("gobang_main"),  // 棋盘
    gobangStatus = document.getElementById("gobang_status"), // 下棋状态
    gobangToolAgain = document.getElementById("gobang_tool_again");    // 再来一盘

resetGobang();
drawGobang(n);


EventUtil.addHandler(gobang, "click", drawPiece);  // 点击棋盘，进行下棋
EventUtil.addHandler(gobangToolAgain, "click", resetGobang);




