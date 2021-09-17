function calculateAverage(numbers) {
  if (Array.isArray(numbers)) {
    let sum = 0;
    let len = numbers.length;
    if (len == 0) {
      return 0;
    }
    for (let i = 0; i < len; i++) {
      sum += numbers[i];
    }
    return sum / len;
  }
}
self.addEventListener(
  "message",
  (e) => {
    let data = e.data;
    switch (data.cmd) {
      case "average":
        let result = calculateAverage(data.data);
        self.postMessage(result);
        break;
      default:
        self.postMessage("Unknown command");
    }
  },
  false
);
