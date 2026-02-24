import { renderSpan, run } from "@rbxts/cmdi-language";
import type { Issue } from "@rbxts/cmdi-language/out/types";
import { Players } from "@rbxts/services";

const LOCAL_PLAYER = Players.LocalPlayer;
const PLAYER_GUI = LOCAL_PLAYER.WaitForChild("PlayerGui") as PlayerGui;

const window = new Instance("ScreenGui");
window.Name = "Render";
window.IgnoreGuiInset = false;

const PADDING = new Instance("UIPadding");
PADDING.PaddingLeft = new UDim(0, 10);
PADDING.PaddingTop = new UDim(0, 10);

const input = new Instance("TextBox");
input.Size = new UDim2(0.5, 0, 1, -32);
input.AnchorPoint = new Vector2(0, 1);
input.Position = UDim2.fromScale(0, 1);

input.BorderSizePixel = 0;
input.BackgroundColor3 = new Color3(0, 0, 0);
input.TextColor3 = new Color3(1, 1, 1);
input.TextSize = 14;
input.Font = Enum.Font.SourceSans;
input.TextXAlignment = Enum.TextXAlignment.Left;
input.TextYAlignment = Enum.TextYAlignment.Top;

input.TextEditable = true;
input.ClearTextOnFocus = false;
input.MultiLine = true;
input.Text = "";

PADDING.Clone().Parent = input;

input.Parent = window;

const output = new Instance("TextBox");
output.Size = new UDim2(0.5, 0, 1, -32);
output.AnchorPoint = new Vector2(1, 1);
output.Position = UDim2.fromScale(1, 1);

output.BorderSizePixel = 0;
output.BackgroundColor3 = new Color3(0, 0, 0);
output.TextColor3 = new Color3(1, 1, 1);
output.TextSize = 14;
output.Font = Enum.Font.SourceSans;
output.TextXAlignment = Enum.TextXAlignment.Left;
output.TextYAlignment = Enum.TextYAlignment.Top;

output.TextEditable = false;
output.ClearTextOnFocus = false;
output.MultiLine = true;

PADDING.Clone().Parent = output;

output.Parent = window;

window.Parent = PLAYER_GUI;

function renderIssue(issue: Issue): string {
	const why = issue.why !== undefined ? `\n  ${issue.why}` : "";
	return `Issue at ${renderSpan(issue.span, "descriptive")}${why}`;
}

function renderTokens(): void {
	const text = input.Text;

	const start = os.clock();
	const [_, issues, tokens] = run(text);
	const elap = os.clock() - start;

	let rendered = `Took ${elap * 1000}ms\n[ISSUES]:\n`;
	for (const issue of issues) {
		const renderedIssue = renderIssue(issue);
		rendered += `${renderedIssue}\n`;
	}

	rendered += "[TOKENS]:\n";
	let index = 0;
	for (const token of tokens) {
		rendered += `${index} at ${renderSpan(token.span, "descriptive")}\n`;
		rendered += `  ${token.fullText}\n`;
		rendered += `  ${token.kind}\n`;
		index++;
	}

	output.Text = rendered;
}

let thread: thread | undefined;

input.GetPropertyChangedSignal("Text").Connect(() => {
	if (thread) {
		task.cancel(thread);
		thread = undefined;
	}

	thread = task.delay(0.1, renderTokens);
});
