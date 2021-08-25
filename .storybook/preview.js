import '../src/index.css';
// parameters 通常用来控制 Storybook 中特性和插件的行为。在我们的例子中我们使用它们来配置actions(模拟的回掉)该如何被处理。
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
