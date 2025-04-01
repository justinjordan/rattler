var $8zHUo$loglevel = require("loglevel");
var $8zHUo$pubsubjs = require("pubsub-js");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "Engine", () => $5c85c054ec5fc92c$export$2e2bcd8739ae039);
$parcel$export(module.exports, "State", () => $8134df58347e086f$export$2e2bcd8739ae039);


const $5c85c054ec5fc92c$var$defaultOptions = {
    debug: false,
    loader: false
};
class $5c85c054ec5fc92c$export$2e2bcd8739ae039 {
    constructor(canvas, options = $5c85c054ec5fc92c$var$defaultOptions){
        this.canvas = canvas;
        this.logger = (0, ($parcel$interopDefault($8zHUo$loglevel))).getLogger("rattler");
        this.states = [];
        this.running = false;
        this.lastUpdate = 0;
        this.publish = (0, ($parcel$interopDefault($8zHUo$pubsubjs))).publish.bind((0, ($parcel$interopDefault($8zHUo$pubsubjs))));
        this.subscribe = (0, ($parcel$interopDefault($8zHUo$pubsubjs))).subscribe.bind((0, ($parcel$interopDefault($8zHUo$pubsubjs))));
        this.unsubscribe = (0, ($parcel$interopDefault($8zHUo$pubsubjs))).unsubscribe.bind((0, ($parcel$interopDefault($8zHUo$pubsubjs))));
        this.options = {
            ...$5c85c054ec5fc92c$var$defaultOptions,
            ...options
        };
        this.handleResize();
        const resizeObserver = new ResizeObserver(()=>this.handleResize());
        resizeObserver.observe(this.canvas);
        this.logger.setLevel(options.debug ? "debug" : "silent");
        this.logger.debug("Efb initialized with options", this.options);
    }
    start() {
        this.init();
        this.running = true;
        this.logger.debug("Rattler is running");
        // Start the game loop
        requestAnimationFrame(this.loop.bind(this));
    }
    stop() {
        this.running = false;
        this.states = [];
        this.logger.debug("Rattler is stopped");
    }
    getCurrentState() {
        return this.states?.[this.states.length - 1];
    }
    getPreviousState() {
        return this.states?.[this.states.length - 2];
    }
    loadState(StateConstructor) {
        const state = new StateConstructor(this);
        this.pushState(state);
        state.handleInit();
    }
    pushState(state) {
        const lastState = this.getCurrentState();
        if (lastState) // Exit the last state before entering the new one
        lastState.handleExit();
        state.handleEnter();
        this.states.push(state);
    }
    popState() {
        const lastState = this.states.pop();
        if (lastState) // Exit the last state before entering the new one
        lastState.handleExit();
        const newState = this.getCurrentState();
        newState.handleEnter();
    }
    handleResize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.logger.debug("Canvas resized to", {
            width: this.canvas.width,
            height: this.canvas.height
        });
        try {
            this.states.forEach((state)=>{
                state?.handleResize();
            });
        } catch (error) {
            this.logger.error("Error resizing current state", error);
        }
    }
    loop(currentTime) {
        let deltaTime = this.lastUpdate > 0 ? (currentTime - this.lastUpdate) / 1000 : 0;
        this.lastUpdate = currentTime;
        // Cancel the loop if the delta is too large (e.g. when tab is inactive)
        if (deltaTime > 1) deltaTime = 0;
        if (!this.running) {
            this.logger.debug("Efb is not running, stopping loop");
            this.stop();
            return;
        }
        if (this.states.length === 0) {
            this.logger.warn("No states to run, stopping loop");
            this.stop();
            return;
        }
        try {
            const state = this.getCurrentState();
            // Update all states
            state.handleUpdate(deltaTime);
            // Render the current state
            state.handleRender(this.canvas);
        } catch (error) {
            this.logger.error("Error in game loop", error);
        }
        // Call the loop again
        requestAnimationFrame(this.loop.bind(this));
    }
}


class $8134df58347e086f$export$2e2bcd8739ae039 {
    constructor(engine){
        this.engine = engine;
        this.isActive = false;
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.engine.canvas.width;
        this.canvas.height = this.engine.canvas.height;
        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    onInit() {}
    onEnter() {}
    onExit() {}
    onKeyup(e) {}
    onMouseDown(e) {}
    onMouseUp(e) {}
    onMouseMove(e, mouseX, mouseY) {}
    onResize() {}
    beforeRender() {}
    onUpdate(deltaTime) {}
    onRender(canvas) {}
    handleInit() {
        this.onInit();
    }
    handleEnter() {
        this.isActive = true;
        document.addEventListener("keyup", this.handleKeyup);
        document.addEventListener("mousedown", this.handleMouseDown);
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
        this.onEnter();
    }
    handleExit() {
        this.isActive = false;
        document.removeEventListener("keyup", this.handleKeyup);
        document.removeEventListener("mousedown", this.handleMouseDown);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
        this.onExit();
    }
    handleKeyup(e) {
        this.onKeyup(e);
    }
    handleResize() {
        this.canvas.width = this.engine.canvas.width;
        this.canvas.height = this.engine.canvas.height;
        this.onResize();
    }
    handleMouseDown(e) {
        this.onMouseDown(e);
    }
    handleMouseUp(e) {
        this.onMouseUp(e);
    }
    handleMouseMove(e) {
        const rect = this.engine.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.onMouseMove(e, mouseX, mouseY);
    }
    handleUpdate(deltaTime) {
        this.onUpdate(deltaTime);
    }
    handleRender(canvas) {
        // This method can be used to perform any pre-rendering logic
        // before the actual rendering of the state
        this.beforeRender();
        // Call the onRender method to perform the actual rendering
        this.onRender(canvas);
    }
}




//# sourceMappingURL=index.js.map
