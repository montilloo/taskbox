// Storybook 有两个基本的组织级别：组件和他的 story。可以将每个 story 视作其组件的排列组合。您可以根据需要给每一个组件创建任意个 story。
import Task from "./Task.vue";

import { action } from "@storybook/addon-actions";

// 我们创建了一个default来提示 Storybook 我们正在文档化的组件：
export default {
	// 组件本身
	component: Task,
	//👇 Our exports that end in "Data" are not stories. story 本身需要但是不用在 Storybook 应用中渲染的信息
	excludeStories: /.*Data$/,
	//  在 Storybook 应用侧边栏的显示
	title: "Task",
	//👇 Our events will be mapped in Storybook UI 事件将会映射到Storybook的UI
	argTypes: {
		onPinTask: {},
		onArchiveTask: {},
	},
};
// action()使我们可以创建一个回调函数，当点击事件触发时 Storybook UI 的actions面板会显示结果。所以如果我们创建了一个 pin 按钮，我们就可以通过面板清楚的知道按钮是否被成功点击了。
// 考虑到我们需要为组件的每一个排列组合都传入同样的 actions，通常的便捷做法是将他们合并到一个actionsData变量中，并传入给每一个定义好的 story 中。
export const actionsData = {
	onPinTask: action("pin-task"),
	onArchiveTask: action("archive-task"),
};

const Template = (args) => ({
	components: { Task },
	setup() {
		return { args, ...actionsData };
	},
	template: '<Task v-bind="args" />',
});
// 我们为每一个我们需要测试的状态导出一个函数，以此来定义我们的 story。Story 实际上就是一个根据给定的状态返回已渲染元素的函数---就像是函数式组件那样。
// 因为我们的组件存在多种排列组合，所以设置一个Template变量不失为一种便捷的做法。使用这样的模式来创建您的 Story 可以大量减少代码量和维护成本。
// Template.bind({}) 是 标准JavaScript 中用来复制函数的技术。我们使用这项技术保证了在使用同一份实现的同时，让每一个导出的story可以配置自己的属性。
export const Default = Template.bind({});
// Arguments 或者简写args , 让我们可以在不重启 Storybook 的前提下实时编辑我们的组件。只要 args 的值被修改我们的组件也会相应的更新。
Default.args = {
	task: {
		id: "1",
		title: "Test Task",
		state: "TASK_INBOX",
		updatedAt: new Date(2018, 0, 1, 9, 0),
	},
};

export const Pinned = Template.bind({});
Pinned.args = {
	task: {
		...Default.args.task,
		state: "TASK_PINNED",
	},
};

export const Archived = Template.bind({});
Archived.args = {
	task: {
		...Default.args.task,
		state: "TASK_ARCHIVED",
	},
};

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = Template.bind({});
LongTitle.args = {
	task: {
		...Default.args.task,
		title: longTitleString,
	},
};
