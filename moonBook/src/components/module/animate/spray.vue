<template>
    <div class="spray">
        <canvas id="canvas" width="981" height="1745"></canvas>
    </div>    
</template>
<script>
export default {
    name:'spray',
    created () {
        this.$nextTick(()=>{
            let Canvas = {}
            Canvas.anim = {
                //初始化
                init() {
                    const canvas = document.getElementById('canvas')
                    canvas.width = window.innerWidth
                    canvas.height = window.innerHeight
                    this.ctx = canvas.getContext('2d')
                    this.cw = canvas.width
                    this.ch = canvas.height
                    this.particles = []
                    this.letters = ['😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','🏀','⚽','👍','🔥']
                },
                //执行动画
                render() {
                    //显示位置 
                    let particle = {
                        x: this.cw / 2,
                        y: this.ch,
                        character: this.letters[Math.floor(Math.random() * this.letters.length)],
                        xSpeed: (Math.random() * 20) - 10,
                        ySpeed: (Math.random() * 20) - 10,
                        color: [155, 100, 50, .7]
                    }
                    this.particles.push(particle)
                    this.drawparticles()
                },
                //绘制字母
                drawparticles() {
                    this.fadeCanvas()
                    var particleCount = this.particles.length
                    for (var i = 0; i < particleCount; i++) {
                        var particle = this.particles[i]
                        this.ctx.font = '20px sans-serif'
                        this.ctx.fillText(particle.character, particle.x, particle.y) //字体属性
                        particle.x += particle.xSpeed
                        particle.y += particle.ySpeed
                        particle.y *= 0.98
                        particle.color[2] *= 0.99
                        particle.color[0] += 1
                        if (particle.color[0] > 253) {
                            particle.color[2] = 0
                        }
                    }
                },
                //先清除画布
                fadeCanvas() {
                    this.ctx.fillStyle = 'rgba(255,255,255,.5)'
                    this.ctx.fillRect(0, 0, this.cw, this.ch)
                }
            }
            Canvas.anim.init()
            Canvas.anim.render()
            setInterval(() => {
                Canvas.anim.render()
            }, 60)
            window.onresize = () => {
                Canvas.anim.init()
            }
        })
    }
}
</script>
<style scoped>

</style>
