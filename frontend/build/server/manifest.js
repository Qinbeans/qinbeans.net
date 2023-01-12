const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-b3213666.js","imports":["_app/immutable/start-b3213666.js","_app/immutable/chunks/index-44c6832b.js","_app/immutable/chunks/singletons-a3690a2b.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-3368a925.js'),
			() => import('./chunks/1-1b36b232.js'),
			() => import('./chunks/2-fab045e0.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: () => import('./chunks/_server.ts-1653707e.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
