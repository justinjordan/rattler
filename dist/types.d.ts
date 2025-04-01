import log from "loglevel";
export abstract class State {
    engine: Engine;
    canvas: HTMLCanvasElement;
    isActive: boolean;
    constructor(engine: Engine);
    onInit(): void;
    onEnter(): void;
    onExit(): void;
    onKeyup(e: KeyboardEvent): void;
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
    onMouseMove(e: MouseEvent, mouseX: number, mouseY: number): void;
    onResize(): void;
    beforeRender(): void;
    onUpdate(deltaTime: number): void;
    onRender(canvas: HTMLCanvasElement): void;
    handleInit(): void;
    handleEnter(): void;
    handleExit(): void;
    handleKeyup(e: KeyboardEvent): void;
    handleResize(): void;
    handleMouseDown(e: MouseEvent): void;
    handleMouseUp(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
    handleUpdate(deltaTime: number): void;
    handleRender(canvas: HTMLCanvasElement): void;
}
type Newable<T> = {
    new (...args: any[]): T;
};
declare const defaultOptions: {
    debug: boolean;
    loader: boolean;
};
type GameOptions = Partial<typeof defaultOptions>;
export abstract class Engine {
    canvas: HTMLCanvasElement;
    logger: log.Logger;
    options: GameOptions;
    states: State[];
    running: boolean;
    constructor(canvas: HTMLCanvasElement, options?: GameOptions);
    abstract init(): void;
    publish: (message: PubSubJS.Message, data?: any) => boolean;
    subscribe: (message: PubSubJS.Message, func: PubSubJS.SubscriptionListener<any>) => PubSubJS.Token;
    unsubscribe: (tokenOrFunction: string | PubSubJS.SubscriptionListener<any>) => PubSubJS.Token | boolean;
    start(): void;
    stop(): void;
    getCurrentState(): State;
    getPreviousState(): State;
    loadState(StateConstructor: Newable<State>): void;
    pushState(state: State): void;
    popState(): void;
}

//# sourceMappingURL=types.d.ts.map
