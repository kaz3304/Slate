// Used to build scss files to base.css file.

const sass = require('sass');
const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

console.log('Building Slate.css file...');

sass.render({
	file: 'src/_base.scss',
	outputStyle: 'expanded'
}, (err, result) => {
	if (err) {
		console.error(err);
		return false;
	}

	const newRes = Buffer.from(result.css).toString();

	postcss([autoprefixer])
		.process(newRes, {
			from: undefined,
			to: undefined
		})
		.then(postcssRes => {
			fs.writeFile('dist/Slate.css', postcssRes.css, (err) => {
				if (err) console.error(err);
				else console.log(`Successfully built Slate.css file. (${(result.stats.duration/60000 * 60).toFixed(2)}s)`);
			})
		})
})