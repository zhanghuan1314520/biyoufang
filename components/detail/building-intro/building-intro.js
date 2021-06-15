var A = Object.assign || function(A) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (A[i] = e[i]);
    }
    return A;
};

Component({
    properties: {
        project: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: null
        }
    },
    data: {
        subscribedIcon: {
            reminded: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAjVBMVEUAAAD/////////////////////////////////////////////////////////////////////////////////////////kQD/pzP/8dr/uFn/yH///fn/+O3/pCr/lgr/8+L/58b/2qj/mxb/4bf/3a7/05f/zIb/v2j/vGH/sUf/rkH/nh3/z4//xHWKujH4AAAAFnRSTlMA7vnSsHMKY+ffzLmSiW1bVUI8MyIaStIHqAAAAhFJREFUWMOtmIFagkAMgO+4AzREEmqnhoKSZWq9/+OV9BUlGzu9+x/g/wbbt9smhijiVKuxDAI5VjqNC3ELj1Mt4QKpp4/XWaIsAYIki+w14QgGGIWWqlACgwwFT67AApVznglYMhnUPNyBNXcPtGcm4QrkjPLcB3AVwT3uieFqYjQeuAEkplkANxDMevmSQPL8viuBQF7mjs77am6MWddkFVjX4Zs5c7CrzBxoGtNSAkUuOhTQnFpPBSSq84RAsnlqvkXL7QoIwt/+Q2ZsuzZ/2NdE5iImoMXc/Kd6GgwpGhHhVKbHAf2+0XdIGaC8GIw1aspaUYKXs8E5YnWQtO8O/n8qQ7AHhPMrNQWMpSFZQJ/pl0ij5WNojtBHf4kkHxAfkhSiAISyGhK9Qp9CxFTKaOZo000B4X1Q1ECfFP/XH2aQEvvbimxmNDXWS8ZM0izTNuayb5//wI8o8Cby9mn+frbyI1JC+xFpkfoRpSL2I4pF4UdUCCF9iGTXat1Emmj+62HRFmn+yHO02DeG4fiCPEci4cLhg0rQJ/tkI/ofUoYOEZvDnOWjRIYIEYIjITdotRPbD69AISOL0W/XDTRMQMwwWv+K3oBA2Y3Hy66cCXK7gX116h58lIn1CnGOqdnxKwS/1NTPG3apcV+zfC9+7quo/+XYfV13PyD4P2m4H1nczz6+D1H+T2P+j3Xu58NPF0pik/I2GpYAAAAASUVORK5CYII=",
            unremind: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAY1BMVEUAAAD8/Pz////////////////////////////////////////////////////////////////////////////////////////////S0tLb29vj4+Pz8/Pq6urX19ft7e3f399GlT9gAAAAGHRSTlMA/vDs0rBzCuffzLmSiW1iW1VCPDMiGmViFbkUAAAB5ElEQVRYw62YjXaCMAyFb4EWFfmZoEsB0fd/yp2xnblhUorL9wD33N4GmgQhurq02T41Jt1ntqw7vMKlsgktSGx1wSbypiCBosnjZdyOAuxcpJRLaYXUYZ02owiyFiscKZIjQpwPFM3hDJFTQhtIThB4M7QJ8waWd9rMO+uHXoDxdDL0AuYpp3Mg5/E6yokv706+d9N773sjVkF0HQ7+k3tcZbYkM/kZEmnxIPuPUPbQcaGgv4WGmxiTwzd5Ksr0/heDIJXmK4ZM7xdcg5bynWDHP3NnTe2+LDXEcmN0pIJqZqFC8sMrEUMxvzt8Pl5iIIYLgEqoZ4mJ+/AqAHbDwcSvxQJIBEMyTN4J0BGHICFXU4c6dLL4i6tRSjUkM9EzJZ/11Qdh086ErDemnWGvI7RHqiOUwugIGTUhtaOpha13/VZHyKLUESpR6wjV6HSEOiDREEoAWA0hK/z8+7DQSEsq7jkyw+RXuN+Y5wiFZCfeVME+2VOM0F9LDdtEjPd+lSvXRMDRP3HLRovt2H4giTSPaf0WrxmHi2lGzaILYcji2uPhUc4CbVzDbib5wZ85Ro8Qg9QUzRw2DDVmDA01WmOW1uCnNYpqDcda47rWAkFppaG1ZFFa+6gtovRXY/rLOrX14QcbjXyTiNdlTgAAAABJRU5ErkJggg=="
        }
    },
    methods: {
        operateBtn: function(t) {
            var e = t.currentTarget.dataset, i = this.properties.project, r = {
                eventType: e.type,
                project: i
            };
            this.triggerEvent("operateBuildingIntro", A({}, r), {});
        },
        openSubscribedDialog: function() {
            this.triggerEvent("operateBuildingIntro", {
                project: this.properties.project,
                eventType: "subscribe"
            });
        }
    }
});