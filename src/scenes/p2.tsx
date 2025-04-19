import {Code, Camera, Layout, Line, Rect, Txt, lines, makeScene2D} from '@motion-canvas/2d';
import {createRef, all, waitFor, beginSlide, Direction, slideTransition} from '@motion-canvas/core';
import {Pane} from '@motion-canvas/ui';

export default makeScene2D(function* (view) {
	view.add(
		<Txt text="Chapter 2" fill="white" />
	);
	yield* slideTransition(Direction.Right);
	yield* waitFor(0.5)
	yield* beginSlide("end of chapter 2");
});
