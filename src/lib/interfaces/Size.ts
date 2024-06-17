export const Size = {
	LARGE: [474, 406.2], //5600 x 4800
	LANDSCAPE: [609.4, 304.65],
	A2: [594, 420],
	A3: [420, 297],
	A4: [297, 210],
	A5: [210, 148],
	A6: [148, 105],
	B2: [707, 500],
	B3: [500, 353],
	B4: [353, 250],
	B5: [250, 176],
	B6: [176, 125]
} as const;
export type SizeType = (typeof Size)[keyof typeof Size];
