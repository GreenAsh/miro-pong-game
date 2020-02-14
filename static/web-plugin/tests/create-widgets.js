// Colors
// $blue:    #007bff !default; // primary
// $indigo:  #6610f2 !default;
// $purple:  #6f42c1 !default;
// $pink:    #e83e8c !default;
// $red:     #dc3545 !default; // danger
// $orange:  #fd7e14 !default;
// $yellow:  #ffc107 !default; // warning
// $green:   #28a745 !default; // success
// $teal:    #20c997 !default;
// $cyan:    #17a2b8 !default; // info

const test = {
	creator: {
		_colors: ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'],
		_state: 0,
		start: async function (prefix, startX) {
			this._state = 1;
			let totalCount = 0;
			let x = startX ? startX : 0;
			let y = 0;
			let colorIndex = 0;
			while (this._state === 1) {
				const batch = [];
				for (let i = 0; i < 100; i++) {
					const shape = {
						type: 'shape',
						text: `${prefix} - ${totalCount++}`,
						width: 190,
						height: 190,
						x: x,
						y: y,
						style: {
							borderWidth: 0,
							borderStyle: 'none',
							backgroundColor: this._colors[colorIndex++ % this._colors.length],
							textColor: PAD_COLOR
						}
					};
					x += 200;
					if (x > 200 * 100) {
						y += 200;
						x = startX;
					}
					batch.push(shape);
				}
				// noinspection JSUnresolvedFunction
				await miro.board.widgets.create(batch);
				//await waitMilliseconds(500);
			}
		},
		stop: function () {
			this._state = 0;
		},
		clear: async function () {
			let widgets = await miro.board.widgets.get();
			let deletionBatch = [];
			for (let i = 0; i < widgets.length; i++) {
				deletionBatch.push(widgets[i].id);
				if (deletionBatch.length > 150) {
					// noinspection JSUnresolvedFunction
					await miro.board.widgets.deleteById(deletionBatch);
					deletionBatch = [];
				}
			}
			if (deletionBatch.length > 0) {
				// noinspection JSUnresolvedFunction
				await miro.board.widgets.deleteById(deletionBatch);
			}
		}
	}
}