/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define("FeaturedChart", [ "jquery", "d3" ], function ($, d3) {
            return factory($, root, doc, d3);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc, root.d3);
    }
}(this, document, function ($, window, document, d3, undefined) {

    var featuredChart,
        _options = {
            chartType:"bar",
            lineType:"basis",
            width:960,
            height:600,
            margin:[0, 0, 0, 0],
            padding:[0, 0, 0, 0],
            data:{},
            animate:false,
            color:d3.scale.category10()
        };

    FeaturedChart.name = 'FeaturedChart';

    function FeaturedChart(options) {

        // 배열로 넘어온 색상을 d3 색상 카테고리로 변환
        if(typeof options.color === "object" && options.color.length > 0) {
            options.color = d3.scale.ordinal().range(options.color);
        }

        this.options = $.extend({}, _options, options);
    }

    FeaturedChart.prototype.createChart = function (el) {
        var chartSize, matrix, widthSize, heightSize, width, height, target = d3.select(el), self = this,
            chartType = this.options.chartType;

        if (chartType === "line") {
            chartSize = this.lineChart(target);
        } else if (chartType === "bar") {
            chartSize = this.barChart(target);
        } else if (chartType === "pie") {
            chartSize = this.pieChart(target);
        } else {
            return false;
        }

        this.updateChart(el, chartSize);

        $(window).on("resize", el, function () {
            self.updateChart(el, chartSize);
        });
    };

    FeaturedChart.prototype.updateChart = function (el, chartSize) {
        var width, widthSize, height, heightSize, matrix = getComputedStyle(el)[this.getCssVendorPropertyName(el, "Transform")];
        if (typeof matrix === "string" && matrix === "none") {
            matrix = "matrix(1, 0, 0, 1, 0, 0)";
        }
        matrix = eval(matrix.replace("matrix(", "[").replace(")", "]"));
        width = chartSize.width;
        widthSize = matrix[0];
        width = width * widthSize;
        height = chartSize.height;
        heightSize = matrix[3];
        height = height * heightSize;
        $(el).parent().css({
            width:width,
            height:height
        });
    };

    FeaturedChart.prototype.getCssVendorPropertyName = function (target, prop) {
        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        if (prop in target.style) {
            return prop;
        }

        for (var i = 0; i < prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in target.style) {
                return vendorProp;
            }
        }
    };

    FeaturedChart.prototype.barChart = function (target) {
        var valueCount, arrayValue = [],
            self = this,
            m = self.options.margin,
            p = self.options.padding,
            w = self.options.width - m[1] - m[3],
            h = self.options.height - m[0] - m[2],
            x = d3.scale.ordinal().rangeRoundBands([0, w - p[1] - p[3]]),
            y = d3.scale.linear().range([0, h - p[0] - p[2]]),
            z = self.options.color,
            data = self.options.data;

        target = target.append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + p[3] + "," + (h - p[2]) + ")");

        // JSON 키 / 값의 개수 얻기
        function getJsonKeyLenght(obj) {
            var count = 0;
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    ++count;
                }
            }
            return count;
        }

        // VALUE 개수 구하기
        valueCount = getJsonKeyLenght(data[0]) - 1;
        for (var i = 0; i < valueCount; i++) {
            arrayValue.push("value" + i);
        }
        // 스택 레이아웃 구조로 데이터를 가공
        var causes = d3.layout.stack()(arrayValue.map(function (cause) {
            return data.map(function (d) {
                return {x:d.label, y:+d[cause]};
            });
        }));

        // X 축 값 설정
        x.domain(causes[0].map(function (d) {
            return d.x;
        }));
        // Y 축 값 설정
        y.domain([0, d3.max(causes[causes.length - 1], function (d) {
            return d.y;
        })]);

        // BAR를 그릴때 스타일링
        var cause = target.selectAll("g.cause")
            .data(causes)
            .enter().append("svg:g")
            .attr("class", "cause")
            .style("fill", function (d, i) {
                return z(i);
            })
            .style("stroke", function (d, i) {
                return d3.rgb(z(i)).darker();
            });

        // Bar가 Y축으로 올라갈때 애니매이션 연출
        var rect = cause.selectAll("rect")
            .data(Object)
            .enter().append("svg:rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("width", x.rangeBand())
            .transition().delay(function (d, i) {
                return i * 100;
            })
            .duration(100)
            .attr("y", function (d) {
                return -y(d.y0) - y(d.y);
            })
            .attr("height", function (d) {
                return y(d.y);
            });

        // X, Y축 스타일 지정 및 이름 설정
        var label = target.selectAll("text")
            .data(x.domain())
            .enter().append("svg:text")
            .attr("class", "x")
            .attr("x", function (d) {
                return x(d) + x.rangeBand() / 2;
            })
            .attr("y", 6)
            .attr("text-anchor", "middle")
            .attr("dy", ".71em")
            .style("fill", "#fff")
            .text(function (d) {
                return d;
            });

        var rule = target.selectAll("g.rule")
            .data(y.ticks(5))
            .enter().append("svg:g")
            .attr("class", "rule")
            .style("fill", "#fff")
            .attr("transform", function (d) {
                return "translate(0," + -y(d) + ")";
            });

        rule.append("svg:line")
            .attr("x2", w - p[1] - p[3])
            .style("stroke", function (d) {
                return d ? "#fff" : "#000";
            })
            .style("stroke-opacity", function (d) {
                return d ? .7 : null;
            });

        rule.append("svg:text")
            .attr("x", w - p[1] - p[3] + 6)
            .attr("dy", ".35em")
            .text(d3.format(",d"));

        return {width:self.options.width, height:self.options.height};
    };

    FeaturedChart.prototype.lineChart = function (target) {
        var self = this,
            m = self.options.margin,
            p = self.options.padding,
            w = self.options.width - m[1] - m[3],
            h = self.options.height - m[0] - m[2],
            data = self.options.data;

        var tempData = [];
        $.map(data, function (val, i) {
            tempData.push(parseInt(val.value0));
        });

        // X scale will fit all values from data[] within pixels 0-w
        var x = d3.scale.linear().domain([0, tempData.length]).range([0, w]);
        var y = d3.scale.linear().domain([0, d3.max(tempData)]).range([h, 0]);

        // create a line function that can convert data[] into x and y points
        var line = d3.svg.line()
            .x(function (d, i) {
                return x(i);
            })
            .y(function (d) {
                return y(d);
            }).interpolate(self.options.lineType);

        var graph = target.append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        graph.append("svg:path").attr("d", line(tempData))
            .attr("transform", "translate(-25)");

        // X 축 생성
        var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

        // X 축 추가
        graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("class","text")
            .text(function (d) {
                return data[d].label;
            });

        // Y 축 생성
        var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");

        // Y 축 추가
        graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft)
            .selectAll("text")
            .attr("class","text");

        return {width:self.options.width, height:self.options.height};
    };

    FeaturedChart.prototype.pieChart = function (target) {
        var self = this,
            w = self.options.width,
            h = self.options.height,
            r = Math.min(w, h) / 2,
            color = self.options.color,
            donut = d3.layout.pie().sort(null),
            data = self.options.data;

        /**
         * 1. target 엘리먼트에 svg 태그를 생성
         * 2. data 바인딩
         * 3. 폭, 높이값 지정
         */
        var vis = target = target.append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");

        var arc = d3.svg.arc().innerRadius(0).outerRadius(r);

        var pie = d3.layout.pie().value(function (d) {
            return d.value0;
        });

        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
            .attr("class", "slice");

        arcs.append("svg:path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc);

        arcs.append("svg:text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("class", "label")
            .text(function (d, i) {
                return data[i].label;
            });

        return {width:this.options.width, height:this.options.height};
    };

    $.fn.featuredChart = function (options) {
        return this.each(function (i) {
            featuredChart = new FeaturedChart(options);
            featuredChart.createChart(this);
        });
    };

    $.fn.featuredChart.Constructor = FeaturedChart;

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featurd=chart]").each(function (i) {
        var self = this,
            dataUrl = $(this).data("chartBind");

        $.getJSON(dataUrl).success(function (msg) {
            featuredChart = new FeaturedChart({
                margin:$(self).data("chartMargin"),
                padding:$(self).data("chartPadding"),
                chartType:$(self).data("chartType"),
                lineType:$(self).data("chartListtype"),
                data:msg
            });
            featuredChart.createChart(self);
        }).error(function (jqXHR, textStatus, errorThrown) {
                console.log("getJSON Error", jqXHR, textStatus, errorThrown);
            });
    });

    return FeaturedChart;
}));