import { reactive, ReactiveFlags } from '@vue/reactivity';
import { Mesh } from 'mesh-ioc';
import { App as VueApp } from 'vue';
import { globalProvideMap } from './utils/provide.js';
import HelloWorld from './components/HelloWorld.vue';
import { HelloWorldManager } from './managers/HelloWorldManager.js';
import { createApp } from 'vue';

export class App {

	protected provides: Record<string, any> = {};

	constructor(
		readonly vue: VueApp,
		readonly mesh: Mesh = new Mesh(),
	){
		(this.mesh as any)[ReactiveFlags.RAW] = true;
		this.mesh.use(instance => reactive(instance));
		this.mesh.constant('App', this);
		this.mesh.constant('Vue', this.vue);
		vue.provide('app', this);
		this.mesh.service(HelloWorldManager);
	}
	
	async start() {
		this.provideServices();
		this.vue.mount('#app');
	}
	
	protected provideServices() {
		this.provides = {};
		for (const [alias, ctor] of globalProvideMap) {
			const instance = this.mesh.resolve(ctor);
			this.vue.provide(alias, instance);
			this.provides[alias] = instance;
		}
	}
}

const vueApp = createApp(HelloWorld);
const app = new App(vueApp);

app.start();

Object.assign(globalThis, {
	app,
});
