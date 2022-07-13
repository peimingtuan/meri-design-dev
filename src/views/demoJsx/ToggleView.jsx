export default {
    name: 'ToggleView',
    data() {
        return {
            toggleVal: true,
            toggleVal2: false,
            selectId: '111',
            selectData: [
                { id: '000', name: '0000' },
                { id: '111', name: '111' },
                { id: '222', name: '222' },
                { id: '333', name: '333', disabled: true },
                { id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个' },
                { id: '555', name: '555呀555' }
            ]
        };
    },
    watch: {
        toggleVal(n, o) {
            if (n !== o) console.log('toggleVal::', n);
        },
        toggleVal2(n, o) {
            if (n !== o) console.log('toggleVal2::', n);
        }
    },
    render(h) {
        return (
            <div class="toggleView">
                <div class="component component-padding">
                    <h1 class="components-title">Toggle组件</h1>
                    <Toggle vModel={this.toggleVal} />
                    <Toggle vModel={this.toggleVal} disable={true} />
                    <Toggle vModel={this.toggleVal2} />
                    <Toggle vModel={this.toggleVal2} disable={true} />
                    <br/>
                    <MSelect vModel={this.selectId} data={this.selectData} />
                </div>
            </div>
        );
    }
};
