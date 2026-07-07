const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

// Lista com "Eu te amo" em 100 línguas diferentes
const languages = [
    "Eu te amo", "I love you", "Te amo", "Je t'aime", "Ti amo", "Ich liebe dich", "Aishiteru", "Saranghae", "Wò ài nǐ", "S'agapo",
    "Ya tebya lyublyu", "Volim te", "Miluji te", "Jeg elsker dig", "Ik hou van je", "Minä rakastan sinua", "Te dua", "M'bi fe", "Maite zaitut", "Khvank",
    "Obicham te", "T'estim", "Ch'ha t'lho", "Bi kham", "Neekunu premistunnanu", "Nakuenda", "Inhobbok", "Ke a go rata", "Me tula prem karto", "Ngo oiy neiy",
    "Mi dushi", "Soro lahn nhee ah", "Eg elskar deg", "Bon s'or", "Thzan", "Anata o aishiteru", "Tora dost laram", "Aloha wau ia 'oe", "Ez te hez dikim", "Techihhila",
    "Mena tuka puga", "Ayor anosh'ni", "Nandiligbey", "Gvgeyu", "Ua Here Vau Ia Oe", "Rikmini vasi", "Mon amour", "Es mīlu tevi", "As tave myliu", "Te sakam",
    "Saya cintamu", "Inba", "Seni seviyorum", "Ti amo assai", "S'ayapo", "Lover deg", "Kulu ti mo", "Wa wa", "Niyen tula", "Ana behibak",
    "Rakhon", "Guaiya ku", "Palangga ta ka", "Esti dalu", "Hore", "Nalingi yo", "Meme", "Gi kor", "U raser", "Ndimakukonda",
    "Saya cintakan mu", "Naku penda", "Tha gràdh agam ort", "Eg elsker deg", "Rwy'n dy garu di", "Taim i' ngra leat", "Ch'ha t'lho", "Ahuvi", "Ani ohev otach", "Main tumse pyar karta hoon",
    "Njan ninne premikkunnu", "Naanu ninna preetisuttene", "Mila heba", "S'agapo poli", "M'bi fe", "Bahibak", "Ahuva", "Ami tomake bhalobashi", "Moi tomak bhal pau", "Maite zaitut",
    "Flm", "Ta grah agam ort", "Negligevat", "Ech hun dech garen", "Poshte", "Kuv hlub koj", "Ko nishita", "Susu", "Ngiyakuthanda", "Ke a go rata"
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

class Particle {
    constructor() {
        this.reset();
        // Distribui pela tela inteira na primeira inicialização
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    reset() {
        // Sorteia uma das 100 línguas
        this.text = languages[Math.floor(Math.random() * languages.length)];
        
        // Variação de tamanhos (fontes menores dão sensação de profundidade e cabem mais na tela)
        this.fontSize = Math.floor(Math.random() * (24 - 10 + 1)) + 10;
        
        // Define o surgimento nas bordas da tela
        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? -180 : canvas.width + 180;
            this.y = Math.random() * canvas.height;
        } else {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() > 0.5 ? -40 : canvas.height + 40;
        }

        // Velocidade um pouco mais suave para a tela cheia não ficar caótica
        this.vx = (Math.random() - 0.5) * 1.2; 
        this.vy = (Math.random() - 0.5) * 1.2; 
        
        if (Math.abs(this.vx) < 0.15) this.vx = 0.4;
        if (Math.abs(this.vy) < 0.15) this.vy = 0.4;

        // Opacidade variada criando efeito de camadas
        this.alpha = Math.random() * (0.85 - 0.3) + 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Reinicia se sumir completamente da área útil
        if (this.x < -250 || this.x > canvas.width + 250 || 
            this.y < -100 || this.y > canvas.height + 100) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.font = `bold ${this.fontSize}px sans-serif`;
        
        // Neon Rosa Intenso
        ctx.fillStyle = "#ff69b4"; 
        ctx.shadowColor = "#ff1493";
        ctx.shadowBlur = 10;

        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    
    // MULTIPLICADO: Agora gera muito mais partículas baseado no tamanho da tela.
    // Garante que telas maiores tenham densidade e telas de celular fiquem cheias sem travar.
    const densityMultiplier = 0.00015; 
    const particleCount = Math.floor(canvas.width * canvas.height * densityMultiplier);
    
    // Força um mínimo de 80 e máximo de 250 elementos voando ao mesmo tempo
    const finalCount = Math.max(80, Math.min(250, particleCount));

    for (let i = 0; i < finalCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();