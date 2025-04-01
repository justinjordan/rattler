import Engine from "./Engine";

export default abstract class State {
  public canvas!: HTMLCanvasElement;
  public isActive = false;

  constructor(public engine: Engine) {
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
  onKeyup(e: KeyboardEvent) {}
  onMouseDown(e: MouseEvent) {}
  onMouseUp(e: MouseEvent) {}
  onMouseMove(e: MouseEvent, mouseX: number, mouseY: number) {}
  onResize() {}
  beforeRender() {}
  onUpdate(deltaTime: number) {}
  onRender(canvas: HTMLCanvasElement) {}

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

  handleKeyup(e: KeyboardEvent) {
    this.onKeyup(e);
  }

  handleResize() {
    this.canvas.width = this.engine.canvas.width;
    this.canvas.height = this.engine.canvas.height;
    this.onResize();
  }

  handleMouseDown(e: MouseEvent) {
    this.onMouseDown(e);
  }

  handleMouseUp(e: MouseEvent) {
    this.onMouseUp(e);
  }

  handleMouseMove(e: MouseEvent) {
    const rect = this.engine.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    this.onMouseMove(e, mouseX, mouseY);
  }

  handleUpdate(deltaTime: number) {
    this.onUpdate(deltaTime);
  }

  handleRender(canvas: HTMLCanvasElement) {
    // This method can be used to perform any pre-rendering logic
    // before the actual rendering of the state
    this.beforeRender();

    // Call the onRender method to perform the actual rendering
    this.onRender(canvas);
  }
}
