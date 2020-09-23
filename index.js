class Loading {
    
    constructor(canvas, options = {}) {
        
        this.options = Object.assign(options, {
            width: 100,
            height: 100,
            step: .25,
            length: 75,
            lineWidth: 6,
            startAngle: -Math.PI / 2,
            colors: {
                outer: 'grey',
                inner: 'yellow',
                background: 'none'
            }
        });
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        
        this.setup();
        
    }
    
    setup() {
        
        const canvas = this.canvas;
        const {width, height, startAngle} = this.options;
        
        canvas.width = width;
        canvas.height = height;

        this.angle = startAngle;
        
        this.draw();
        this.update();
        
    }
    
    update() {

        const {step} = this.options;
        
        if(this.angle < Math.PI * 2) {
            this.angle += step / Math.PI;
        }else {
            this.angle = 0;
        }
        
        this.draw();
        this.frameId = requestAnimationFrame(() => this.update());
        
    }
    
    draw() {
        
        const ctx = this.ctx;
        const {width, height, lineWidth, length} = this.options;
        const {outer: outerColor, inner: innerColor, background} = this.options.colors;
        
        const center = Math.min(width, height) / 2;
        const radius = center - lineWidth;
        
        const angle = this.angle;
        
        //background
        if(background == 'none') {
            ctx.clearRect(0, 0, width, height);
        }else {
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, width, height);
        }
        
        //outer ring
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = outerColor;
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        //inner ring
        ctx.lineWidth = lineWidth;
        if(innerColor == 'rainbow') {
            ctx.strokeStyle = `hsl(${angle * (180 / Math.PI)}, 100%, 50%)`;
        }else {
            ctx.strokeStyle = innerColor;
        }
        ctx.beginPath();
        ctx.arc(center, center, radius, angle, angle + length * (Math.PI / 180));
        ctx.stroke();
        
    }
    
}

var loading = new Loading(document.querySelector('canvas'));
