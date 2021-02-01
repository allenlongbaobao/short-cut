const { shortCut } = require("../lib/index");

test("测试实例化", () => {
  expect(shortCut.option.duration).toBe("fast");
});

test("测试闪烁时间变更", () => {
  shortCut.setDuration("medium");
  expect(shortCut.option.duration).toBe("medium");
});
