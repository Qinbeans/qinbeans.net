export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-b3213666.js","imports":["_app/immutable/start-b3213666.js","_app/immutable/chunks/index-44c6832b.js","_app/immutable/chunks/singletons-a3690a2b.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: () => import('./entries/endpoints/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
