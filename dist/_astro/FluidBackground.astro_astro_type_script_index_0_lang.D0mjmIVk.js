function e(e={}){let t=e.canvasSelector||`#fluid-canvas`,n=e.pointerColorScale==null?.8:e.pointerColorScale,r=document.querySelector(t);if(!r)return null;He();let i={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:.85,VELOCITY_DISSIPATION:.2,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3,SHADING:!0,COLORFUL:!0,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!1,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1};e.config&&Object.assign(i,e.config);let a=e.hueRange?e.hueRange[0]:0,o=e.hueRange?e.hueRange[1]:1;function s(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let c=[],l=[];c.push(new s);let{gl:u,ext:d}=ee(r);ne()&&(i.DYE_RESOLUTION=512),d.supportLinearFiltering||(i.DYE_RESOLUTION=512,i.SHADING=!1,i.BLOOM=!1,i.SUNRAYS=!1);function ee(e){let t={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext(`webgl2`,t),r=!!n;r||(n=e.getContext(`webgl`,t)||e.getContext(`experimental-webgl`,t));let i,a;r?(n.getExtension(`EXT_color_buffer_float`),a=n.getExtension(`OES_texture_float_linear`)):(i=n.getExtension(`OES_texture_half_float`),a=n.getExtension(`OES_texture_half_float_linear`)),n.clearColor(0,0,0,1);let o=r?n.HALF_FLOAT:i.HALF_FLOAT_OES,s,c,l;return r?(s=f(n,n.RGBA16F,n.RGBA,o),c=f(n,n.RG16F,n.RG,o),l=f(n,n.R16F,n.RED,o)):(s=f(n,n.RGBA,n.RGBA,o),c=f(n,n.RGBA,n.RGBA,o),l=f(n,n.RGBA,n.RGBA,o)),{gl:n,ext:{formatRGBA:s,formatRG:c,formatR:l,halfFloatTexType:o,supportLinearFiltering:a}}}function f(e,t,n,r){if(!te(e,t,n,r))switch(t){case e.R16F:return f(e,e.RG16F,e.RG,r);case e.RG16F:return f(e,e.RGBA16F,e.RGBA,r);default:return null}return{internalFormat:t,format:n}}function te(e,t,n,r){let i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,n,r,null);let a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function ne(){return/Mobi|Android/i.test(navigator.userAgent)}class re{constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(e){let t=0;for(let n=0;n<e.length;n++)t+=ft(e[n]);let n=this.programs[t];if(n==null){let r=m(u.FRAGMENT_SHADER,this.fragmentShaderSource,e);n=ie(this.vertexShader,r),this.programs[t]=n}n!=this.activeProgram&&(this.uniforms=ae(n),this.activeProgram=n)}bind(){u.useProgram(this.activeProgram)}}class p{constructor(e,t){this.uniforms={},this.program=ie(e,t),this.uniforms=ae(this.program)}bind(){u.useProgram(this.program)}}function ie(e,t){let n=u.createProgram();return u.attachShader(n,e),u.attachShader(n,t),u.linkProgram(n),u.getProgramParameter(n,u.LINK_STATUS)||console.trace(u.getProgramInfoLog(n)),n}function ae(e){let t=[],n=u.getProgramParameter(e,u.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let n=u.getActiveUniform(e,r).name;t[n]=u.getUniformLocation(e,n)}return t}function m(e,t,n){t=oe(t,n);let r=u.createShader(e);return u.shaderSource(r,t),u.compileShader(r),u.getShaderParameter(r,u.COMPILE_STATUS)||console.trace(u.getShaderInfoLog(r)),r}function oe(e,t){if(t==null)return e;let n=``;return t.forEach(e=>{n+=`#define `+e+`
`}),n+e}let h=m(u.VERTEX_SHADER,`
      precision highp float;

      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
  `),se=m(u.VERTEX_SHADER,`
      precision highp float;

      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          float offset = 1.33333333;
          vL = vUv - texelSize * offset;
          vR = vUv + texelSize * offset;
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
  `),ce=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform sampler2D uTexture;

      void main () {
          vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
          sum += texture2D(uTexture, vL) * 0.35294117;
          sum += texture2D(uTexture, vR) * 0.35294117;
          gl_FragColor = sum;
      }
  `),le=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
  `),ue=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
  `),de=m(u.FRAGMENT_SHADER,`
      precision mediump float;

      uniform vec4 color;

      void main () {
          gl_FragColor = color;
      }
  `),fe=m(u.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float aspectRatio;

      #define SCALE 25.0

      void main () {
          vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
          float v = mod(uv.x + uv.y, 2.0);
          v = v * 0.1 + 0.8;
          gl_FragColor = vec4(vec3(v), 1.0);
      }
  `),pe=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 curve;
      uniform float threshold;

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float br = max(c.r, max(c.g, c.b));
          float rq = clamp(br - curve.x, 0.0, curve.y);
          rq = curve.z * rq * rq;
          c *= max(rq, br - threshold) / max(br, 0.0001);
          gl_FragColor = vec4(c, 0.0);
      }
  `),me=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;

      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum;
      }
  `),he=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform float intensity;

      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum * intensity;
      }
  `),ge=m(u.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          vec4 c = texture2D(uTexture, vUv);
          float br = max(c.r, max(c.g, c.b));
          c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
          gl_FragColor = c;
      }
  `),_e=m(u.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float weight;

      #define ITERATIONS 16

      void main () {
          float Density = 0.3;
          float Decay = 0.95;
          float Exposure = 0.7;

          vec2 coord = vUv;
          vec2 dir = vUv - 0.5;

          dir *= 1.0 / float(ITERATIONS) * Density;
          float illuminationDecay = 1.0;

          float color = texture2D(uTexture, vUv).a;

          for (int i = 0; i < ITERATIONS; i++)
          {
              coord -= dir;
              float col = texture2D(uTexture, coord).a;
              color += col * illuminationDecay * weight;
              illuminationDecay *= Decay;
          }

          gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
      }
  `),ve=m(u.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
  `),ye=m(u.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;

          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
      #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
      #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }`,d.supportLinearFiltering?null:[`MANUAL_FILTERING`]),be=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
  `),xe=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
  `),Se=m(u.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;

          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
  `),Ce=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
  `),we=m(u.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
  `),g=(u.bindBuffer(u.ARRAY_BUFFER,u.createBuffer()),u.bufferData(u.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),u.STATIC_DRAW),u.bindBuffer(u.ELEMENT_ARRAY_BUFFER,u.createBuffer()),u.bufferData(u.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),u.STATIC_DRAW),u.vertexAttribPointer(0,2,u.FLOAT,!1,0,0),u.enableVertexAttribArray(0),(e,t=!1)=>{e==null?(u.viewport(0,0,u.drawingBufferWidth,u.drawingBufferHeight),u.bindFramebuffer(u.FRAMEBUFFER,null)):(u.viewport(0,0,e.width,e.height),u.bindFramebuffer(u.FRAMEBUFFER,e.fbo)),t&&(u.clearColor(0,0,0,1),u.clear(u.COLOR_BUFFER_BIT)),u.drawElements(u.TRIANGLES,6,u.UNSIGNED_SHORT,0)}),_,v,y,b,x,S,C=[],w,Te,Ee=Ie(e.ditheringTexture||`LDR_LLL1_0.png`),T=new p(se,ce),De=new p(h,le),E=new p(h,ue),Oe=new p(h,de),ke=new p(h,fe),D=new p(h,pe),O=new p(h,me),k=new p(h,he),Ae=new p(h,ge),A=new p(h,_e),j=new p(h,ve),M=new p(h,ye),N=new p(h,be),P=new p(h,xe),F=new p(h,Se),I=new p(h,Ce),L=new p(h,we),R=new re(h,`
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uBloom;
      uniform sampler2D uSunrays;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;

      #ifdef SHADING
          vec3 lc = texture2D(uTexture, vL).rgb;
          vec3 rc = texture2D(uTexture, vR).rgb;
          vec3 tc = texture2D(uTexture, vT).rgb;
          vec3 bc = texture2D(uTexture, vB).rgb;

          float dx = length(rc) - length(lc);
          float dy = length(tc) - length(bc);

          vec3 n = normalize(vec3(dx, dy, length(texelSize)));
          vec3 l = vec3(0.0, 0.0, 1.0);

          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
          c *= diffuse;
      #endif

      #ifdef BLOOM
          vec3 bloom = texture2D(uBloom, vUv).rgb;
      #endif

      #ifdef SUNRAYS
          float sunrays = texture2D(uSunrays, vUv).r;
          c *= sunrays;
      #ifdef BLOOM
          bloom *= sunrays;
      #endif
      #endif

      #ifdef BLOOM
          float noise = texture2D(uDithering, vUv * ditherScale).r;
          noise = noise * 2.0 - 1.0;
          bloom += noise / 255.0;
          bloom = linearToGamma(bloom);
          c += bloom;
      #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
  `);function je(){let e=Q(i.SIM_RESOLUTION),t=Q(i.DYE_RESOLUTION),n=d.halfFloatTexType,r=d.formatRGBA,a=d.formatRG,o=d.formatR,s=d.supportLinearFiltering?u.LINEAR:u.NEAREST;u.disable(u.BLEND),_=_==null?B(t.width,t.height,r.internalFormat,r.format,n,s):Fe(_,t.width,t.height,r.internalFormat,r.format,n,s),v=v==null?B(e.width,e.height,a.internalFormat,a.format,n,s):Fe(v,e.width,e.height,a.internalFormat,a.format,n,s),y=z(e.width,e.height,o.internalFormat,o.format,n,u.NEAREST),b=z(e.width,e.height,o.internalFormat,o.format,n,u.NEAREST),x=B(e.width,e.height,o.internalFormat,o.format,n,u.NEAREST),Me(),Ne()}function Me(){let e=Q(i.BLOOM_RESOLUTION),t=d.halfFloatTexType,n=d.formatRGBA,r=d.supportLinearFiltering?u.LINEAR:u.NEAREST;S=z(e.width,e.height,n.internalFormat,n.format,t,r),C.length=0;for(let a=0;a<i.BLOOM_ITERATIONS;a++){let i=e.width>>a+1,o=e.height>>a+1;if(i<2||o<2)break;let s=z(i,o,n.internalFormat,n.format,t,r);C.push(s)}}function Ne(){let e=Q(i.SUNRAYS_RESOLUTION),t=d.halfFloatTexType,n=d.formatR,r=d.supportLinearFiltering?u.LINEAR:u.NEAREST;w=z(e.width,e.height,n.internalFormat,n.format,t,r),Te=z(e.width,e.height,n.internalFormat,n.format,t,r)}function z(e,t,n,r,i,a){u.activeTexture(u.TEXTURE0);let o=u.createTexture();u.bindTexture(u.TEXTURE_2D,o),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,a),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,a),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.texImage2D(u.TEXTURE_2D,0,n,e,t,0,r,i,null);let s=u.createFramebuffer();return u.bindFramebuffer(u.FRAMEBUFFER,s),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,o,0),u.viewport(0,0,e,t),u.clear(u.COLOR_BUFFER_BIT),{texture:o,fbo:s,width:e,height:t,texelSizeX:1/e,texelSizeY:1/t,attach(e){return u.activeTexture(u.TEXTURE0+e),u.bindTexture(u.TEXTURE_2D,o),e}}}function B(e,t,n,r,i,a){let o=z(e,t,n,r,i,a),s=z(e,t,n,r,i,a);return{width:e,height:t,texelSizeX:o.texelSizeX,texelSizeY:o.texelSizeY,get read(){return o},set read(e){o=e},get write(){return s},set write(e){s=e},swap(){let e=o;o=s,s=e}}}function Pe(e,t,n,r,i,a,o){let s=z(t,n,r,i,a,o);return De.bind(),u.uniform1i(De.uniforms.uTexture,e.attach(0)),g(s),s}function Fe(e,t,n,r,i,a,o){return e.width==t&&e.height==n?e:(e.read=Pe(e.read,t,n,r,i,a,o),e.write=z(t,n,r,i,a,o),e.width=t,e.height=n,e.texelSizeX=1/t,e.texelSizeY=1/n,e)}function Ie(e){let t=u.createTexture();u.bindTexture(u.TEXTURE_2D,t),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.REPEAT),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.REPEAT),u.texImage2D(u.TEXTURE_2D,0,u.RGB,1,1,0,u.RGB,u.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let n={texture:t,width:1,height:1,attach(e){return u.activeTexture(u.TEXTURE0+e),u.bindTexture(u.TEXTURE_2D,t),e}},r=new Image;return r.onload=()=>{n.width=r.width,n.height=r.height,u.bindTexture(u.TEXTURE_2D,t),u.texImage2D(u.TEXTURE_2D,0,u.RGB,u.RGB,u.UNSIGNED_BYTE,r)},r.src=e,n}function Le(){let e=[];i.SHADING&&e.push(`SHADING`),i.BLOOM&&e.push(`BLOOM`),i.SUNRAYS&&e.push(`SUNRAYS`),R.setKeywords(e)}Le(),je();let Re=e.initialSplats==null?10:e.initialSplats,ze=e.initialColorScale==null?1:e.initialColorScale;[[.2,.3],[.38,.18],[.55,.34],[.72,.22],[.86,.4],[.28,.62],[.46,.72],[.63,.58],[.8,.74],[.13,.52]].slice(0,Math.max(0,Re)).forEach(([e,t],n)=>{let r=Z(ze);W(e,t,(n%2?1:-1)*(300+n*25),(n%3?1:-1)*(260+n*20),r)});let Be=e.ambientIntervalMs==null?5e3:e.ambientIntervalMs;Be>0&&setInterval(()=>{document.hidden||l.push(1)},Be);let V=Date.now(),H=0;U();function U(){if(document.hidden){V=Date.now(),requestAnimationFrame(U);return}let e=Ve();He()&&je(),Ue(e),We(),i.PAUSED||Ge(e),Ke(null),requestAnimationFrame(U)}function Ve(){let e=Date.now(),t=(e-V)/1e3;return t=Math.min(t,.016666),V=e,t}function He(){let e=$(r.clientWidth),t=$(r.clientHeight);return r.width!=e||r.height!=t?(r.width=e,r.height=t,!0):!1}function Ue(e){i.COLORFUL&&(H+=e*i.COLOR_UPDATE_SPEED,H>=1&&(H=ut(H,0,1),c.forEach(e=>{e.color=Z()})))}function We(){l.length>0&&et(l.pop()),c.forEach(e=>{e.moved&&(e.moved=!1,$e(e))})}function Ge(e){u.disable(u.BLEND),P.bind(),u.uniform2f(P.uniforms.texelSize,v.texelSizeX,v.texelSizeY),u.uniform1i(P.uniforms.uVelocity,v.read.attach(0)),g(b),F.bind(),u.uniform2f(F.uniforms.texelSize,v.texelSizeX,v.texelSizeY),u.uniform1i(F.uniforms.uVelocity,v.read.attach(0)),u.uniform1i(F.uniforms.uCurl,b.attach(1)),u.uniform1f(F.uniforms.curl,i.CURL),u.uniform1f(F.uniforms.dt,e),g(v.write),v.swap(),N.bind(),u.uniform2f(N.uniforms.texelSize,v.texelSizeX,v.texelSizeY),u.uniform1i(N.uniforms.uVelocity,v.read.attach(0)),g(y),E.bind(),u.uniform1i(E.uniforms.uTexture,x.read.attach(0)),u.uniform1f(E.uniforms.value,i.PRESSURE),g(x.write),x.swap(),I.bind(),u.uniform2f(I.uniforms.texelSize,v.texelSizeX,v.texelSizeY),u.uniform1i(I.uniforms.uDivergence,y.attach(0));for(let e=0;e<i.PRESSURE_ITERATIONS;e++)u.uniform1i(I.uniforms.uPressure,x.read.attach(1)),g(x.write),x.swap();L.bind(),u.uniform2f(L.uniforms.texelSize,v.texelSizeX,v.texelSizeY),u.uniform1i(L.uniforms.uPressure,x.read.attach(0)),u.uniform1i(L.uniforms.uVelocity,v.read.attach(1)),g(v.write),v.swap(),M.bind(),u.uniform2f(M.uniforms.texelSize,v.texelSizeX,v.texelSizeY),d.supportLinearFiltering||u.uniform2f(M.uniforms.dyeTexelSize,v.texelSizeX,v.texelSizeY);let t=v.read.attach(0);u.uniform1i(M.uniforms.uVelocity,t),u.uniform1i(M.uniforms.uSource,t),u.uniform1f(M.uniforms.dt,e),u.uniform1f(M.uniforms.dissipation,i.VELOCITY_DISSIPATION),g(v.write),v.swap(),d.supportLinearFiltering||u.uniform2f(M.uniforms.dyeTexelSize,_.texelSizeX,_.texelSizeY),u.uniform1i(M.uniforms.uVelocity,v.read.attach(0)),u.uniform1i(M.uniforms.uSource,_.read.attach(1)),u.uniform1f(M.uniforms.dissipation,i.DENSITY_DISSIPATION),g(_.write),_.swap()}function Ke(e){i.BLOOM&&Xe(_.read,S),i.SUNRAYS&&(Ze(_.read,_.write,w),Qe(w,Te,1)),e==null||!i.TRANSPARENT?(u.blendFunc(u.ONE,u.ONE_MINUS_SRC_ALPHA),u.enable(u.BLEND)):u.disable(u.BLEND),i.TRANSPARENT||qe(e,lt(i.BACK_COLOR)),e==null&&i.TRANSPARENT&&Je(e),Ye(e)}function qe(e,t){Oe.bind(),u.uniform4f(Oe.uniforms.color,t.r,t.g,t.b,1),g(e)}function Je(e){ke.bind(),u.uniform1f(ke.uniforms.aspectRatio,r.width/r.height),g(e)}function Ye(e){let t=e==null?u.drawingBufferWidth:e.width,n=e==null?u.drawingBufferHeight:e.height;if(R.bind(),i.SHADING&&u.uniform2f(R.uniforms.texelSize,1/t,1/n),u.uniform1i(R.uniforms.uTexture,_.read.attach(0)),i.BLOOM){u.uniform1i(R.uniforms.uBloom,S.attach(1)),u.uniform1i(R.uniforms.uDithering,Ee.attach(2));let e=dt(Ee,t,n);u.uniform2f(R.uniforms.ditherScale,e.x,e.y)}i.SUNRAYS&&u.uniform1i(R.uniforms.uSunrays,w.attach(3)),g(e)}function Xe(e,t){if(C.length<2)return;let n=t;u.disable(u.BLEND),D.bind();let r=i.BLOOM_THRESHOLD*i.BLOOM_SOFT_KNEE+1e-4,a=i.BLOOM_THRESHOLD-r,o=r*2,s=.25/r;u.uniform3f(D.uniforms.curve,a,o,s),u.uniform1f(D.uniforms.threshold,i.BLOOM_THRESHOLD),u.uniform1i(D.uniforms.uTexture,e.attach(0)),g(n),O.bind();for(let e=0;e<C.length;e++){let t=C[e];u.uniform2f(O.uniforms.texelSize,n.texelSizeX,n.texelSizeY),u.uniform1i(O.uniforms.uTexture,n.attach(0)),g(t),n=t}u.blendFunc(u.ONE,u.ONE),u.enable(u.BLEND);for(let e=C.length-2;e>=0;e--){let t=C[e];u.uniform2f(O.uniforms.texelSize,n.texelSizeX,n.texelSizeY),u.uniform1i(O.uniforms.uTexture,n.attach(0)),u.viewport(0,0,t.width,t.height),g(t),n=t}u.disable(u.BLEND),k.bind(),u.uniform2f(k.uniforms.texelSize,n.texelSizeX,n.texelSizeY),u.uniform1i(k.uniforms.uTexture,n.attach(0)),u.uniform1f(k.uniforms.intensity,i.BLOOM_INTENSITY),g(t)}function Ze(e,t,n){u.disable(u.BLEND),Ae.bind(),u.uniform1i(Ae.uniforms.uTexture,e.attach(0)),g(t),A.bind(),u.uniform1f(A.uniforms.weight,i.SUNRAYS_WEIGHT),u.uniform1i(A.uniforms.uTexture,t.attach(0)),g(n)}function Qe(e,t,n){T.bind();for(let r=0;r<n;r++)u.uniform2f(T.uniforms.texelSize,e.texelSizeX,0),u.uniform1i(T.uniforms.uTexture,e.attach(0)),g(t),u.uniform2f(T.uniforms.texelSize,0,e.texelSizeY),u.uniform1i(T.uniforms.uTexture,t.attach(0)),g(e)}function $e(e){let t=e.deltaX*i.SPLAT_FORCE,n=e.deltaY*i.SPLAT_FORCE;W(e.texcoordX,e.texcoordY,t,n,e.color)}function et(e){for(let t=0;t<e;t++){let e=Z();e.r*=10,e.g*=10,e.b*=10,W(Math.random(),Math.random(),1e3*(Math.random()-.5),1e3*(Math.random()-.5),e)}}function W(e,t,n,a,o){j.bind(),u.uniform1i(j.uniforms.uTarget,v.read.attach(0)),u.uniform1f(j.uniforms.aspectRatio,r.width/r.height),u.uniform2f(j.uniforms.point,e,t),u.uniform3f(j.uniforms.color,n,a,0),u.uniform1f(j.uniforms.radius,tt(i.SPLAT_RADIUS/100)),g(v.write),v.swap(),u.uniform1i(j.uniforms.uTarget,_.read.attach(0)),u.uniform3f(j.uniforms.color,o.r,o.g,o.b),g(_.write),_.swap()}function tt(e){let t=r.width/r.height;return t>1&&(e*=t),e}let G=e.interactionTarget||window,nt=e.hover!==!1;function K(e,t){let n=r.getBoundingClientRect();if(n.width===0||n.height===0)return null;let i=e-n.left,a=t-n.top;return i<0||a<0||i>n.width||a>n.height?null:{x:$(i),y:$(a)}}let q=null,J=!1,rt=0;function it(){q!=null&&(q.moved=!1),J=!1}G.addEventListener(`mousedown`,e=>{let t=K(e.clientX,e.clientY);if(t==null)return;let n=c.find(e=>e.id==-1);n??=new s,Y(n,-1,t.x,t.y)}),G.addEventListener(`mousemove`,e=>{let t=K(e.clientX,e.clientY);if(t==null){J&&it();return}let n=c[0];if(n.down){X(n,t.x,t.y);return}if(!nt)return;let r=performance.now();r-rt<16||(rt=r,q??(q=new s,c.push(q)),J?X(q,t.x,t.y):(Y(q,-2,t.x,t.y),J=!0))}),G.addEventListener(`mouseleave`,it),window.addEventListener(`mouseup`,()=>{at(c[0])}),r.addEventListener(`touchstart`,e=>{e.preventDefault();let t=e.targetTouches;for(;t.length>=c.length;)c.push(new s);for(let e=0;e<t.length;e++){let n=K(t[e].clientX,t[e].clientY);n!=null&&Y(c[e+1],t[e].identifier,n.x,n.y)}},{passive:!1}),r.addEventListener(`touchmove`,e=>{e.preventDefault();let t=e.targetTouches;for(let e=0;e<t.length;e++){let n=c[e+1];if(!n.down)continue;let r=K(t[e].clientX,t[e].clientY);r!=null&&X(n,r.x,r.y)}},{passive:!1}),window.addEventListener(`touchend`,e=>{let t=e.changedTouches;for(let e=0;e<t.length;e++){let n=c.find(n=>n.id==t[e].identifier);n!=null&&at(n)}});function Y(e,t,i,a){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=i/r.width,e.texcoordY=1-a/r.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Z(n)}function X(e,t,n){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/r.width,e.texcoordY=1-n/r.height,e.deltaX=ot(e.texcoordX-e.prevTexcoordX),e.deltaY=st(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0}function at(e){e.down=!1}function ot(e){let t=r.width/r.height;return t<1&&(e*=t),e}function st(e){let t=r.width/r.height;return t>1&&(e/=t),e}function Z(e){let t=e??1,n=ct(a+Math.random()*(o-a),1,1);return n.r*=.15*t,n.g*=.15*t,n.b*=.15*t,n}function ct(e,t,n){let r,i,a,o,s,c,l,u;switch(o=Math.floor(e*6),s=e*6-o,c=n*(1-t),l=n*(1-s*t),u=n*(1-(1-s)*t),o%6){case 0:r=n,i=u,a=c;break;case 1:r=l,i=n,a=c;break;case 2:r=c,i=n,a=u;break;case 3:r=c,i=l,a=n;break;case 4:r=u,i=c,a=n;break;case 5:r=n,i=c,a=l}return{r,g:i,b:a}}function lt(e){return{r:e.r/255,g:e.g/255,b:e.b/255}}function ut(e,t,n){let r=n-t;return r==0?t:(e-t)%r+t}function Q(e){let t=u.drawingBufferWidth/u.drawingBufferHeight;t<1&&(t=1/t);let n=Math.round(e),r=Math.round(e*t);return u.drawingBufferWidth>u.drawingBufferHeight?{width:r,height:n}:{width:n,height:r}}function dt(e,t,n){return{x:t/e.width,y:n/e.height}}function $(e){let t=window.devicePixelRatio||1;return Math.floor(e*t)}function ft(e){if(e.length==0)return 0;let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}}var t=`/tc63`,n=`/tc63`.endsWith(`/`)?t.slice(0,-1):t;function r(e=`/`){return n+(e.startsWith(`/`)?e:`/`+e)}var i=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;document.getElementById(`fluid-canvas`)&&!i&&e({canvasSelector:`#fluid-canvas`,ditheringTexture:r(`/fluid/LDR_LLL1_0.png`),hueRange:[.7,.82],config:{BACK_COLOR:{r:255,g:255,b:255},TRANSPARENT:!1,BLOOM:!1,SUNRAYS:!1,DENSITY_DISSIPATION:1,SPLAT_RADIUS:.16},pointerColorScale:.55,ambientIntervalMs:5e3,initialSplats:6,initialColorScale:.5});