window.onload = function () {
    new CreateList([
        {
            project: [{
                text: "项目一"
            }, {
                text: "条目一",
                href: "#"
            }, {
                text: "条目二",
                href: "#"
            }]
        }, {
            project: [{
                text: "项目二"
            }, {
                text: "条目一",
                href: "#"
            }, {
                text: "条目二",
                href: "#"
            }]
        }, {
            project: [{
                text: "项目三"
            }, {
                text: "条目一",
                href: "#"
            }, {
                text: "条目二",
                href: "#"
            }]
        }
    ]);
};
