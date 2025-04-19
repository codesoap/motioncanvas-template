import {Code, Camera, Layout, Line, Rect, Txt, lines, makeScene2D} from '@motion-canvas/2d';
import {createRef, all, waitFor, beginSlide} from '@motion-canvas/core';
import {FilePane} from './components/filepane';

export default makeScene2D(function* (view) {
	const v1 = `\
func main() {
    if aFlag {
        f := foo()
        bar(f)
    }
}`
	const v2 = `\
func main() {
    if !aFlag {
        return
    }
    f := foo()
    bar(f)
}`
	const newFile = `\
func foo() string {
    return "Hello, world!"
}`

	const camera = createRef<Camera>();
	const layout = createRef<Laout>();
	const code1 = createRef<Rect>();
	const code2 = createRef<Rect>();
	view.add(
		<Camera ref={camera}>
			<Layout ref={layout} layout direction="row" gap={56} x={28} >
				<FilePane ref={code1} filename={"foo/main.go"} content={v1} />
				<FilePane ref={code2} filename={"foo/foo.go"} content={newFile} hide={true} />
			</Layout>
		</Camera>
	);

	// Workaround for https://github.com/motion-canvas/motion-canvas/issues/1057:
	camera().scene().position(view.size().div(2));

	camera().position(code1().position());
	yield* beginSlide('first slide');
	yield* code1().tweenContent(v2, 1);
	yield* waitFor(0.5)
	yield* beginSlide('second slide');
	yield* all(
		code1().tweenSelection(lines(4), 1),
		camera().position(layout().position(), 1),
		code2().tweenHide(false, 1),
	);
	yield* waitFor(0.8)
	yield* beginSlide('end of chapter 1');
});
