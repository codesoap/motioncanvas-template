import {Rect, NodeProps, Rect, Layout, Txt, Code, CodeSelection, initial, signal} from '@motion-canvas/2d';
import {SignalValue, SimpleSignal, all, createRef} from '@motion-canvas/core';

export interface FilePaneProps extends NodeProps {
	filename?: SignalValue<string>;
	content?: SignalValue<string>;
	hide?: SignalValue<boolean>;
}

export class FilePane extends Rect {
	@initial("")
	@signal()
	public declare readonly filename: SimpleSignal<string, this>;

	@initial("")
	@signal()
	public declare readonly content: SimpleSignal<string, this>;

	@initial(false)
	@signal()
	public declare readonly hide: SimpleSignal<boolean, this>;

	private readonly container = createRef<Rect>();
	private readonly title = createRef<Txt>();
	private readonly body = createRef<Code>();

	public constructor(props?: FilePaneProps) {
		super({
			...props,
		});

		this.add(
			<Rect layout ref={this.container} fill={"#212120"} radius={14} opacity={this.hide() ? 0 : 1} >
				<Layout direction="column" gap={14} >
					<Rect fill={'#4a006e'} radius={[14, 14, 0, 0]} padding={14} >
						<Txt ref={this.title} text={this.filename} fill={'white'} />
					</Rect>
					<Code ref={this.body} code={this.content} margin={14} />
				</Layout>
			</Rect>,
		);
	}

	public *tweenContent(newCode: string, duration: number = 1) {
		yield* this.body().code(newCode, duration);
	}

	public *tweenHide(newHide: boolean, duration: number = 1) {
		yield* this.container().opacity(newHide ? 0 : 1, duration);
	}

	public *tweenSelection(newSelection: CodeSelection, duration: number = 1) {
		yield* this.body().selection(newSelection, duration);
	}
}
