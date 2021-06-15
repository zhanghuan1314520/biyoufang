Component({
    properties: {
        width: {
            type: String,
            value: ""
        },
        height: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        poster: {
            type: String,
            value: ""
        },
        margins: {
            type: Object,
            value: {}
        }
    },
    ready: function() {
        this.obserbveVideoNode(), this.videoContext = wx.createVideoContext("advertVideo", this);
    },
    detached: function() {
        this.IntersectionObserver && this.IntersectionObserver.disconnect();
    },
    methods: {
        obserbveVideoNode: function() {
            var e = this;
            wx.canIUse("createIntersectionObserver") && (this.IntersectionObserver = wx.createIntersectionObserver(this), 
            this.IntersectionObserver.relativeToViewport(this.properties.margins), this.IntersectionObserver.observe("#advertVideo", function(t) {
                0 === t.intersectionRatio ? e.videoContext.pause() : e.videoContext.play();
            }));
        }
    }
});