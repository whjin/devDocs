var utils = {
    calculateColor: function (color, opacity) {
        if (color.indexOf('#') === 0) {
            var color16 = color.slice(1);
            var r = parseInt(color16.slice(0, 2), 16);
            var g = parseInt(color16.slice(2, 4), 16);
            var b = parseInt(color16.slice(4), 16);
            return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        } else if (/^rgb\(/.test(color)) {
            return color.replace(/rgb/, 'rgba').replace(')', ",") +
                opacity + ')';
        } else {
            return color.split(',').splice(0, 3).join(',') +
                opacity + ')';
        }
    }
};
var arrayUtils = {
    forEach: function (arr, cb, scope) {
        if (typeof Array.prototype.forEach === 'function') {
            arr.forEach(cb, scope);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                cb.apply(scope, [arr[i], i, arr]);
            }
        }
    },
    map: function (arr, cb, scope) {
        if (typeof Array.prototype.map === 'function') {
            return arr.map(cb, scope);
        } else {
            var mapped = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                mapped[i] = cb.apply(scope, [arr[i], i, arr]);
            }
            return mapped;
        }
    }
};

var Marker = (function () {
    var M = function (options) {
        this.x = options.x;
        this.y = options.y;
        this.rotation = options.rotation;
        this.style = options.style;
        this.color = options.color;
        this.size = options.size;
        this.borderWidth = options.borderWidth;
        this.borderColor = options.borderColor;
    };

    M.prototype.draw = function (context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        context.lineWidth = this.borderWidth || 0;
        context.strokeStyle = this.borderColor || '#000';
        context.fillStyle = this.color || '#000';
        // 目前先只支持圆
        context.beginPath();
        if (this.style === 'circle') {
            context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        } else if (this.style === 'arrow') {
            context.moveTo(-this.size, -this.size);
            context.lineTo(this.size, 0);
            context.lineTo(-this.size, this.size);
            context.lineTo(-this.size / 4, 0);
            context.lineTo(-this.size, -this.size);
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
    };

    return M;
})();

var Arc = (function () {
    var A = function (options) {
        var startX = options.startX,
            startY = options.startY,
            endX = options.endX,
            endY = options.endY;

        //两点之间的圆有多个，通过两点及半径便可以定出两个圆，根据需要选取其中一个圆
        var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
        var m = (startX + endX) / 2; // 横轴中点
        var n = (startY + endY) / 2; // 纵轴中点
        var factor = 1.5;

        var centerX = (startY - endY) * factor + m;
        var centerY = (endX - startX) * factor + n;

        var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2));
        var startAngle = Math.atan2(startY - centerY, startX - centerX);
        var endAngle = Math.atan2(endY - centerY, endX - centerX);

        // this.L = L;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.centerX = centerX;
        this.centerY = centerY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.startLabel = options && options.labels && options.labels[0],
            this.endLabel = options && options.labels && options.labels[1],
            this.radius = radius;
        this.lineWidth = options.width || 1;
        this.strokeStyle = options.color || '#000';
        this.shadowBlur = options.shadowBlur;
    };

    A.prototype.draw = function (context) {
        context.save();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;

        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle, false);
        context.stroke();
        context.restore();

        context.save();
        context.fillStyle = this.strokeStyle;
        context.font = "15px sans-serif";
        if (this.startLabel) {
            var x = this.startLabel.indexOf('澳门') !== -1 ? this.startX - 20 : this.startX;
            var y = this.startLabel.indexOf('澳门') !== -1 ? this.startY + 25 : this.startY;
            context.fillText(this.startLabel, x, y);
        }
        if (this.endLabel) {
            var x = this.endLabel.indexOf('澳门') !== -1 ? this.endX - 20 : this.endX;
            var y = this.endLabel.indexOf('澳门') !== -1 ? this.endY + 25 : this.endY;
            context.fillText(this.endLabel, x, y);
        }
        context.restore();
    };

    return A;
})();

var Pulse = (function () {
    function P(options) {
        this.x = options.x;
        this.y = options.y;
        this.maxRadius = options.radius;
        this.color = options.color;
        this.shadowBlur = 5;
        this.lineWidth = options.borderWidth;
        this.r = 0;
        this.factor = 2 / options.radius;
    }

    P.prototype.draw = function (context) {
        // var vr = (this.maxRadius - this.r) * this.factor;
        var vr = 0.5;
        this.r += vr;
        // this.shadowBlur = Math.floor(this.r);

        context.save();
        context.translate(this.x, this.y);
        var strokeColor = this.color;
        strokeColor = utils.calculateColor(strokeColor, 1 - this.r / this.maxRadius);
        context.strokeStyle = strokeColor;
        context.shadowBlur = this.shadowBlur;
        context.shadowColor = strokeColor;
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(0, 0, this.r, 0, Math.PI * 2, false);
        context.stroke();
        context.restore();

        if (Math.abs(this.maxRadius - this.r) < 0.8) {
            this.r = 0;
        }
    };

    return P;
})();

var Spark = (function () {
    var S = function (options) {
        var startX = options.startX,
            startY = options.startY,
            endX = options.endX,
            endY = options.endY;

        //两点之间的圆有多个，通过两点及半径便可以定出两个圆，根据需要选取其中一个圆
        var L = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
        var m = (startX + endX) / 2; // 横轴中点
        var n = (startY + endY) / 2; // 纵轴中点
        var factor = 1.5;

        var centerX = (startY - endY) * factor + m;
        var centerY = (endX - startX) * factor + n;

        var radius = Math.sqrt(Math.pow(L / 2, 2) + Math.pow(L * factor, 2));
        var startAngle = Math.atan2(startY - centerY, startX - centerX);
        var endAngle = Math.atan2(endY - centerY, endX - centerX);

        // 保证Spark的弧度不超过Math.PI
        if (startAngle * endAngle < 0) {
            if (startAngle < 0) {
                startAngle += Math.PI * 2;
                endAngle += Math.PI * 2;
            } else {
                endAngle += Math.PI * 2;
            }
        }

        this.tailPointsCount = 5; // 拖尾点数
        this.centerX = centerX;
        this.centerY = centerY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.radius = radius;
        this.lineWidth = options.width || 5;
        this.strokeStyle = options.color || '#000';
        this.factor = 2 / this.radius;
        this.deltaAngle = (80 / Math.min(this.radius, 400)) / this.tailPointsCount;
        this.trailAngle = this.startAngle;
        this.arcAngle = this.startAngle;

        this.animateBlur = true;

        this.marker = new Marker({
            x: 50,
            y: 80,
            rotation: 50 * Math.PI / 180,
            style: 'arrow',
            color: 'rgb(255, 255, 255)',
            size: 2,
            borderWidth: 0,
            borderColor: this.strokeStyle
        });
    };

    S.prototype.drawArc = function (context, strokeColor, lineWidth, startAngle, endAngle) {
        context.save();
        context.lineWidth = lineWidth;
        // context.lineWidth = 5;
        context.strokeStyle = strokeColor;
        // context.shadowColor = this.strokeStyle;
        // context.shadowBlur = 5;
        context.lineCap = "round";
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle, false);
        context.stroke();
        context.restore();
    };

    S.prototype.draw = function (context) {
        var endAngle = this.endAngle;
        // 匀速
        var angle = this.trailAngle + (endAngle - this.startAngle) * this.factor;
        var strokeColor = this.strokeStyle;
        if (this.animateBlur) {
            this.arcAngle = angle;
        }
        this.trailAngle = angle;
        strokeColor = utils.calculateColor(strokeColor, 0.1);

        this.drawArc(context, strokeColor, this.lineWidth, this.startAngle, this.arcAngle);

        // 拖尾效果
        var count = this.tailPointsCount;
        for (var i = 0; i < count; i++) {
            var arcColor = utils.calculateColor(this.strokeStyle, 0.3 - 0.3 / count * i);
            var tailLineWidth = 5;
            if (this.trailAngle - this.deltaAngle * i > this.startAngle) {
                this.drawArc(context, arcColor,
                    tailLineWidth - tailLineWidth / count * i,
                    this.trailAngle - this.deltaAngle * i,
                    this.trailAngle
                );
            }
        }

        context.save();
        context.translate(this.centerX, this.centerY);
        this.marker.x = Math.cos(this.trailAngle) * this.radius;
        this.marker.y = Math.sin(this.trailAngle) * this.radius;
        this.marker.rotation = this.trailAngle + Math.PI / 2;
        this.marker.draw(context);
        context.restore();

        if ((endAngle - this.trailAngle) * 180 / Math.PI < 0.5) {
            this.trailAngle = this.startAngle;
            this.animateBlur = false;
        }
    };

    return S;
})();

var Migration = function (options) {
    this.data = options.data;
    this.store = {
        arcs: [],
        markers: [],
        pulses: [],
        sparks: []
    };
    this.playAnimation = true;
    this.started = false;
    this.context = options.context;

    this.init();
};

Migration.prototype.init = function () {
    this.updateData(this.data);
};
/*
 * Shape 必须拥有draw方法
 */
Migration.prototype.add = function (Shape) {

};
Migration.prototype.remove = function () {

};
Migration.prototype.clear = function () {
    this.store = {
        arcs: [],
        markers: [],
        pulses: [],
        sparks: []
    };
    // 更新状态
    this.playAnimation = true;
    this.started = false;
    // 清除绘画实例，如果没有这个方法，多次调用start，相当于存在多个动画队列同时进行
    window.cancelAnimationFrame(this.requestAnimationId);
};
/*
 * 更新数据
 */
Migration.prototype.updateData = function (data) {
    if (!data || data.length === 0) {
        return;
    }
    this.clear();
    this.data = data;
    if (this.data && this.data.length > 0) {
        arrayUtils.forEach(this.data, function (element) {
            var arc = new Arc({
                startX: element.from[0],
                startY: element.from[1],
                endX: element.to[0],
                endY: element.to[1],
                labels: element.labels,
                width: 1,
                color: element.color
            });
            var marker = new Marker({
                x: element.to[0],
                y: element.to[1],
                rotation: arc.endAngle + Math.PI / 2,
                style: 'arrow',
                color: element.color,
                size: 4,
                borderWidth: 0,
                borderColor: element.color
            });
            var pulse = new Pulse({
                x: element.to[0],
                y: element.to[1],
                // radius: Math.min(Math.max(arc.radius / 10, 20), 30),
                radius: 25,
                color: element.color,
                borderWidth: 3
            });
            var spark = new Spark({
                startX: element.from[0],
                startY: element.from[1],
                endX: element.to[0],
                endY: element.to[1],
                width: 15,
                color: element.color
            });

            this.store.arcs.push(arc);
            this.store.markers.push(marker);
            this.store.pulses.push(pulse);
            this.store.sparks.push(spark);
        }, this);
    }
};
/*
 */
Migration.prototype.start = function (canvas) {
    var that = this;
    if (!this.started) {
        (function drawFrame() {
            that.requestAnimationId = window.requestAnimationFrame(drawFrame, canvas);

            if (that.playAnimation) {
                //that.context.clearRect(0, 0, canvas.width, canvas.height);
                //canvas.width = canvas.width;
                // 微信浏览器有问题，不许使用这种写法
                canvas.width += 1;
                canvas.width -= 1;
                for (var p in that.store) {
                    var shapes = that.store[p];
                    for (var i = 0, len = shapes.length; i < len; i++) {
                        shapes[i].draw(that.context);
                    }
                }
            }
        })();
        this.started = true;
    }
};
Migration.prototype.play = function () {
    this.playAnimation = true;
};
Migration.prototype.pause = function () {
    this.playAnimation = false;
};

// window.Migration = Migration;
var QQMapPlugin = window.QQMapPlugin = window.QQMapPlugin || {};

//声明类,opts为类属性，初始化时传入（非必须，看实际需求）
var MigrationOverlay = function (map, cfg) {
    this.setMap(map);
    this.config = cfg;
    qq.maps.Overlay.call(this);
    this.mapHandles = [];
};
//继承Overlay基类
MigrationOverlay.prototype = new qq.maps.Overlay();
//实现构造方法
MigrationOverlay.prototype.construct = function () {
    //将dom添加到覆盖物层
    this.config.canvas = document.createElement('canvas');
    this.config.context = this.config.canvas.getContext('2d');
    this.getPanes().overlayLayer.appendChild(this.config.canvas);
    this.resize();

    //var context = this.config.preCanvas.getContext('2d');
    if (!this.migration) {
        var data = this.convertData();
        this.migration = new Migration({
            data: data,
            context: this.config.context
        });
        this.bindMapEvents();
    }

    this.constructed = true;
    this.draging = false;
};

MigrationOverlay.prototype.bindMapEvents = function () {
    var that = this;
    this.mapHandles.push(qq.maps.event.addListener(
        that.map,
        'bounds_changed',
        function () {
            console.info('bounds_changed');
            that.draw();
        }
    ));
    // autoResize 为false时，改变容器不会触发resize事件；
    // autoResize 为true时，map的resize事件会频繁刷新;
    // 所以这里只监控window的resize事件
    window.onresize = function () {
        that.resize();
    };
    this.mapHandles.push(qq.maps.event.addListener(
        that.map,
        'dragstart',
        function () {
            console.info('map dragstart');
            that.pause();
        }
    ));
    this.mapHandles.push(qq.maps.event.addListener(
        that.map,
        'dragend',
        function () {
            console.info('map dragend');
            that.play();
            that.draw();
        }
    ));
};

MigrationOverlay.prototype.resize = function () {
    // 获取map宽高
    var containerStyle = window.getComputedStyle(this.map.getContainer());
    this.config.canvas.style.position = 'absolute';
    this.config.canvas.className = 'migration-overlay';
    this.config.canvas.setAttribute('width', parseInt(containerStyle.width, 10));
    this.config.canvas.setAttribute('height', parseInt(containerStyle.height, 10));

    // this.transform();
};

MigrationOverlay.prototype.transform = function () {
    var bounds = this.map.getBounds();
    if (bounds) {
        var topLeft = new qq.maps.LatLng(
            bounds.getNorthEast().getLat(),
            bounds.getSouthWest().getLng()
        );
        var projection = this.getProjection();
        var point = projection.fromLatLngToDivPixel(topLeft);

        // 保证canvas始终叠在左上角而不随map bounds变化而移动
        this.config.canvas.style.transform = 'translate(' +
            Math.round(point.x) + 'px,' +
            Math.round(point.y) + 'px)';
    }
};

MigrationOverlay.prototype.convertData = function () {
    var bounds = this.map.getBounds();

    if (this.config && this.config.data && bounds) {
        var topLeft = new qq.maps.LatLng(
            bounds.getNorthEast().getLat(),
            bounds.getSouthWest().getLng()
        );
        var projection = this.getProjection();
        var layerOffset = projection.fromLatLngToDivPixel(topLeft);
        var data = arrayUtils.map(this.config.data, function (d) {
            var fromPixel = projection.fromLatLngToDivPixel(new qq.maps.LatLng(d.from[1], d.from[0]));
            var toPixel = projection.fromLatLngToDivPixel(new qq.maps.LatLng(d.to[1], d.to[0]));
            // overlay 的左上点默认随着地图初始化时的左上边界移动。
            // 为了保证前迁徙动画能够完整画出，所以必须让canvas占据整个地图视图范围。
            // draw中已经移动了canvas overlay的位置，此处需要靠调整偏移来正确绘制迁徙点的位置
            return {
                from: [fromPixel.getX() - layerOffset.x, fromPixel.getY() - layerOffset.y],
                to: [toPixel.getX() - layerOffset.x, toPixel.getY() - layerOffset.y],
                labels: d.labels,
                value: d.value,
                color: d.color
            }
        }, this);

        return data;
    }
};

// 更新数据
MigrationOverlay.prototype.setData = function (data) {
    this.config.data = data;
    this.draw();
};

MigrationOverlay.prototype.show = function () {
    this.config.canvas.style.display = "";
};

MigrationOverlay.prototype.hide = function () {
    this.config.canvas.style.display = "none";
};

MigrationOverlay.prototype.draw = function () {
    var bounds = this.map.getBounds();
    if (bounds && this.migration.playAnimation) {
        this.transform();

        var data = this.convertData();
        this.migration.updateData(data);
        this.migration.start(this.config.canvas);
    }
};
MigrationOverlay.prototype.pause = function () {
    this.migration.pause();
};
MigrationOverlay.prototype.play = function () {
    this.migration.play();
};
//实现析构方法（类生命周期结束时会自动调用，用于释放资源等）
MigrationOverlay.prototype.destroy = function () {
    this.migration.clear();
    //移除dom
    this.config.canvas.parentNode.removeChild(this.config.canvas);
    arrayUtils.forEach(this.mapHandles, function (handle) {
        qq.mpas.event.removeListener(handle);
    });
    this.mapHandles = [];
};

QQMapPlugin["MigrationOverlay"] = MigrationOverlay;


window.map = null,
    window.mOverlay = null,
    window.onload = function () {
        var data = '[{"from":[113.26627,23.13171],"to":[108.32754,22.81521],"labels":[null,"广西"],"color":"#ff3a31"},{"from":[113.26627,23.13171],"to":[112.9834,28.11266],"labels":[null,"湖南"],"color":"#ff7e2b"},{"from":[113.26627,23.13171],"to":[115.91004,28.67417],"labels":[null,"江西"],"color":"#ffc726"},{"from":[113.26627,23.13171],"to":[114.34234,30.54539],"labels":[null,"湖北"],"color":"#e9ff20"},{"from":[113.26627,23.13171],"to":[119.29659,26.09982],"labels":[null,"福建"],"color":"#99ff1b"},{"from":[113.26627,23.13171],"to":[106.70722,26.5982],"labels":[null,"贵州"],"color":"#45ff15"},{"from":[113.26627,23.13171],"to":[104.07572,30.65089],"labels":[null,"四川"],"color":"#10ff33"},{"from":[113.26627,23.13171],"to":[120.1536,30.26555],"labels":[null,"浙江"],"color":"#0aff84"},{"from":[113.26627,23.13171],"to":[121.4737,31.23037],"labels":[null,"上海"],"color":"#05ffd9"},{"from":[113.26627,23.13171],"to":[113.75322,34.76571],"labels":[null,"河南"],"color":"#00ccff"}]';
        window.map = new qq.maps.Map(document.getElementById("map_container"), {
            zoom: 5,
            center: new qq.maps.LatLng(25.980426678683252, 106.92269849999998),
            mapTypeId: qq.maps.MapTypeId.ROADMAP
        });
        window.mOverlay = new QQMapPlugin.MigrationOverlay(window.map, {data: JSON.parse(data)});
        new qq.maps.Label({
            position: new qq.maps.LatLng(25.735, 123.46777777777777),
            map: window.map, content: "钓鱼岛",
            style: {borderStyle: "none", color: "#fff", backgroundColor: "transparent"}
        });
        new qq.maps.Label({
            position: new qq.maps.LatLng(25.9175, 124.55138888888888),
            map: window.map,
            content: "赤尾屿",
            offset: new qq.maps.Size(0, (-10)),
            style: {borderStyle: "none", color: "#fff", backgroundColor: "transparent"}
        });
    };