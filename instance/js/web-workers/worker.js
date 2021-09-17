function startComputation1() {
  let inputVal = document.getElementById("input").value;
  inputVal = inputVal.replace(/(^\s*)|(\s*$)/g, "");
  let tips = document.getElementById("tips");
  let computationVal = document.getElementById("computationVal");
  computationVal.value = "";
  let flag = [...inputVal].some((item) => isNaN(item));
  if (flag) {
    tips.innerText = "存在非法字符，请输入数字！";
    return;
  } else {
    tips.innerText = "";
  }
  let set = new Set(inputVal.split(" ").map(Number));
  let data = Array.from(set);
  data.map((item, index) => {
    if (item == 0) {
      data.splice(index, 1);
    }
  });
  worker.postMessage({ cmd: "average", data: data });
}

function startComputation() {
  let inputVal = document.getElementById("input").value;
  let tips = document.getElementById("tips");
  let computationVal = document.getElementById("computationVal");
  computationVal.value = "";
  let flag = [...inputVal].some((item) => isNaN(item));
  if (flag) {
    tips.innerText = "存在非法字符，请输入数字！";
    return;
  } else {
    tips.innerText = "";
  }
  let set = new Set(inputVal.split(" ").map(Number));
  let data = Array.from(set);
  data.map((item, index) => {
    if (item == 0) {
      data.splice(index, 1);
    }
  });
  worker.postMessage({ cmd: "average", data: data });
}

let worker = new Worker("task.js");
worker.addEventListener(
  "message",
  (e) => {
    computationVal.value = Number.isInteger(e.data)
      ? e.data
      : e.data.toFixed(2);
  },
  false
);
