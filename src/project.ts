import {makeProject} from '@motion-canvas/core';

import p1 from './scenes/p1?scene';
import p2 from './scenes/p2?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/go';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [p1, p2],
});
