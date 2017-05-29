let WIDTH = 600;
let HEIGHT = 600;
let PSIZE = 8;
let COLORS = []

import S from './s'

export default class Canvas {
	constructor(canvas){
		this.canvasElem = canvas;
		this.ctx = canvas.getContext("2d");
		//rect is offset of canvas in window
		this.rect = canvas.getBoundingClientRect();
		this.brush = S.class1;
	}
	getMousePos(evt){
		return [evt.clientX - this.rect.left - WIDTH / 2, 
		evt.clientY - this.rect.top - HEIGHT / 2]
    }
    setBrush(brush){
    	this.brush = brush;
    }
    plotWithTr(xTr, yTr){//, isRegression){
    	//takes in data points to plot
    	//type: "c" vs "r"
    }
    linkToStore(store){
    	this.store = store;
    }
    onPointAdded(evt){
    	let xTr = this.getMousePos(evt);
    	let yTr = this.brush;
    	this.store.addPoint(xTr, yTr);
    	this.clearCtx();
    	this.drawStoreTr();
    }
    drawStoreTr(){
    	let xTr = this.store.xTr;
    	let yTr = this.store.yTr;
    	for(var i = 0; i < xTr.length; i ++){
    		this.drawPoint(xTr[i][0], xTr[i][1], S.colors[yTr[i]])
    	}
    }
    drawBgWithClassif(classif){
    	for (var i = -WIDTH / 2; i <= WIDTH / 2; i += 5){
    		for (var ii = -HEIGHT / 2; ii <= HEIGHT / 2; ii += 5){
    			this.drawPixel(i, ii, S.bgColors[classif(i, ii)]);
    		}
    	}
    }
    clearCtx(){
    	this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
    }
    drawPoint(x, y, color){
    	this.ctx.fillStyle = color;
    	this.ctx.fillRect(
    		x - PSIZE/2 + WIDTH / 2, 
    		y - PSIZE/2 + HEIGHT / 2, 
    		PSIZE, 
    		PSIZE
    	)
    }
    drawPixel(x, y, color){
    	this.ctx.fillStyle = color;
    	this.ctx.fillRect(
    		x + WIDTH / 2, 
    		y + HEIGHT / 2, 
    		2, 
    		2
    	)
    }
    trainAndClassif(){
    	this.currentClassif = this.store.trainAndClassif();
    	this.clearCtx();
    	console.log(this.currentClassif);
    	this.drawBgWithClassif(this.currentClassif);
    	this.drawStoreTr();
    }
}