<script setup lang="ts">
import { onMounted } from "vue";
const anim_data = {
  domArr: [
    // 杂乱的正方形
    {
      widthStr: "11vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/easy_trans.png')",
      topStr: "calc(50% - 20vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 39vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.4,
      opacityAnimMap: new Map([
        [0.2, 0.4], // [帧，值]
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "8vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/sa-token.png')",
      topStr: "calc(50% - 24vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 24vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 1,
      opacityAnimMap: new Map([]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: -250, z: 1000 }
          }
        ]
      ])
    },
    {
      widthStr: "7vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/forest.png')",
      topStr: "calc(50% - 7vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 33vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.8,
      opacityAnimMap: new Map([
        [0, 0.8],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },

    {
      widthStr: "4vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/Jpom.png')",
      topStr: "calc(50% - 1vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 14vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.3,
      opacityAnimMap: new Map([
        [0, 0.6],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 900 }
          }
        ]
      ])
    },
    {
      widthStr: "4vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/hmily.png')",
      topStr: "",
      rightStr: "",
      bottomStr: "calc(50% - 12vw)",
      leftStr: "calc(50% - 15vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.4,
      opacityAnimMap: new Map([
        [0, 0.4],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 30, z: 1000 }
          }
        ]
      ])
    },
    {
      widthStr: "11vw",
      backgroundColorStr: "",
      backgroundImageStr:
        "url('/assets/img/logo-animation/image-combiner.png')",
      topStr: "",
      rightStr: "",
      bottomStr: "calc(50% - 20vw)",
      leftStr: "calc(50% - 38vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.3,
      opacityAnimMap: new Map([
        [0, 0.3],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "6vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/northstar.png')",
      topStr: "calc(50% - 8vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 12vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.3,
      opacityAnimMap: new Map([
        [0, 0.5],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: -100, y: -100, z: 1000 }
          }
        ]
      ])
    },
    {
      widthStr: "6vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/redisfront.png')",
      topStr: "",
      rightStr: "",
      bottomStr: "calc(50% - 10vw)",
      leftStr: "calc(50% - 24vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.95,
      opacityAnimMap: new Map([
        [0, 0.95],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "9vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/ShenYu.png')",
      topStr: "",
      rightStr: "",
      bottomStr: "calc(50% - 22vw)",
      leftStr: "calc(50% - 17vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.95,
      opacityAnimMap: new Map([
        [0, 0.95],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 1300 }
          }
        ]
      ])
    },
    {
      widthStr: "5vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/sureness.png')",
      topStr: "",
      rightStr: "",
      bottomStr: "calc(50% - 24vw)",
      leftStr: "calc(50% - 1vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.35,
      opacityAnimMap: new Map([
        [0, 0.35],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "8vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/liteFlow.png')",
      topStr: "calc(50% - 14vw)",
      rightStr: "calc(50% - 14vw)",
      bottomStr: "",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.4,
      opacityAnimMap: new Map([
        [0, 0.4],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 300, y: -400, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "4vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/go-view.png')",
      topStr: "calc(50% - 14vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 10vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.3,
      opacityAnimMap: new Map([
        [0, 0.4],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: -50, y: -100, z: 1000 }
          }
        ]
      ])
    },
    {
      widthStr: "8vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/hertzbeat.png')",
      topStr: "",
      rightStr: "calc(50% - 11vw)",
      bottomStr: "calc(50% - 18vw)",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.67,
      opacityAnimMap: new Map([
        [0, 0.67],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 1600 }
          }
        ]
      ])
    },
    {
      widthStr: "6vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/soul.png')",
      topStr: "calc(50% - 21vw)",
      rightStr: "calc(50% - 34vw)",
      bottomStr: "",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.95,
      opacityAnimMap: new Map([
        [0, 0.95],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "2.5vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/gobrs-async.png')",
      topStr: "calc(50% - 3vw)",
      rightStr: "calc(50% - 15vw)",
      bottomStr: "",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.2,
      opacityAnimMap: new Map([
        [0, 0.3],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 1600 }
          }
        ]
      ])
    },
    {
      widthStr: "3vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/myth.png')",
      topStr: "",
      rightStr: "calc(50% - 20vw)",
      bottomStr: "calc(50% - 3vw)",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.96,
      opacityAnimMap: new Map([
        [0, 0.96],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "5vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/MaxKey.png')",
      topStr: "",
      rightStr: "calc(50% - 17vw)",
      bottomStr: "calc(50% - 11vw)",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.96,
      opacityAnimMap: new Map([
        [0, 0.96],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 20, y: 0, z: 1000 }
          }
        ]
      ])
    },
    {
      widthStr: "6vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/TLog.png')",
      topStr: "",
      rightStr: "calc(50% - 38vw)",
      bottomStr: "calc(50% - 4vw)",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.96,
      opacityAnimMap: new Map([
        [0, 0.96],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "11vw",
      backgroundColorStr: "",
      backgroundImageStr:
        "url('/assets/img/logo-animation/RuoYi-Vue-Plus.png')",
      topStr: "",
      rightStr: "calc(50% - 36vw)",
      bottomStr: "calc(50% - 20vw)",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.5,
      opacityAnimMap: new Map([
        [0, 0.5],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: 0, z: 800 }
          }
        ]
      ])
    },
    {
      widthStr: "6vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/mendmix.png')",
      topStr: "",
      rightStr: "calc(50% - 21vw)",
      bottomStr: "calc(50% - 26vw)",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.2,
      opacityAnimMap: new Map([
        [0, 0.2],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 150, y: 0, z: 1100 }
          }
        ]
      ])
    },
    {
      widthStr: "4.2vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/Disjob.png')",
      topStr: "calc(50% - 10vw)",
      rightStr: "calc(50% - 14vw)",
      bottomStr: "",
      leftStr: "",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.2,
      opacityAnimMap: new Map([
        [0, 0.2],
        [1, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 }
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 }
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: -80, z: 800 }
          }
        ]
      ])
    },

    // logo 图标
    {
      widthStr: "13vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/hutool.png')",
      topStr: "calc(50% - 6vw)",
      rightStr: "",
      bottomStr: "",
      leftStr: "calc(50% - 6vw)",
      className: "e-square",
      parentClassName: "effect-box",
      opacity: 0.4,
      opacityAnimMap: new Map([
        [0, 0.4], // [帧，值]
        [0.6, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 0 },
        scale: 1
      },
      transformAnimMap: new Map([
        [
          0,
          {
            translate3d: { x: 0, y: 0, z: 0 },
            scale: 1
          }
        ],
        [
          1,
          {
            translate3d: { x: 0, y: -1000, z: 800 },
            scale: 1.5
          }
        ]
      ])
    },
    {
      widthStr: "100%",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo/dromara.jpg')",
      topStr: "",
      rightStr: "",
      bottomStr: "",
      leftStr: "",
      className: "e-icon-box-bg",
      parentClassName: "e-icon-box",
      opacity: 0,
      opacityAnimMap: new Map([
        [0.2, 0], // [帧，值]
        [0.35, 1]
      ]),
      transform: {
        translate3d: { x: 0, y: 0, z: 10 },
        scale: 0.8
      },
      transformAnimMap: new Map([
        [
          0.2,
          {
            translate3d: { x: 0, y: 0, z: 10 },
            scale: 0.8
          }
        ],
        [
          0.35,
          {
            translate3d: { x: 0, y: 0, z: 10 },
            scale: 1
          }
        ]
      ])
    }
  ]
};

// 特效管理
class EffectManager {
  constructor(data = anim_data) {
    data.domArr.forEach((item) => {
      const entity = new Entity();

      // 添加形状组件
      entity.addComp(
        new ShapeComp({
          shapeAtt: item
        })
      );

      // 添加动画组件
      entity.addComp(
        new ShapeAnimComp({
          opacityAnimMap: item.opacityAnimMap,
          transformAnimMap: item.transformAnimMap
        })
      );

      // 添加滚动事件组件
      entity.addComp(
        new RollEventComp({
          cb: function (scrollPos) {
            this.getComp("ShapeAnimComp").changeOpacity(
              scrollPos,
              this.getComp("ShapeComp")
            );
            this.getComp("ShapeAnimComp").changeTransform(
              scrollPos,
              this.getComp("ShapeComp")
            );
          }.bind(entity)
        })
      );
    });
  }
}

// 单体
class Entity {
  _compMap: Map<any, any>;
  constructor() {
    this._compMap = new Map();
  }

  addComp(comp) {
    this._compMap.set(comp.name, comp);
  }

  getComp(compName) {
    return this._compMap.get(compName);
  }
}

// 形状组件
class ShapeComp {
  name: string;
  _shapeDom: HTMLDivElement;
  _opacity: null;
  _transform: null;
  constructor(data) {
    this.name = "ShapeComp";
    this._shapeDom = document.createElement("div");
    this._shapeDom.classList.add(data.shapeAtt.className);
    this._shapeDom.style.width = data.shapeAtt.widthStr;
    this._shapeDom.style.height = data.shapeAtt.widthStr;
    this._shapeDom.style.backgroundImage = data.shapeAtt.backgroundImageStr;
    this._shapeDom.style.top = data.shapeAtt.topStr;
    this._shapeDom.style.right = data.shapeAtt.rightStr;
    this._shapeDom.style.bottom = data.shapeAtt.bottomStr;
    this._shapeDom.style.left = data.shapeAtt.leftStr;
    this._shapeDom.style.backgroundColor = data.shapeAtt.backgroundColorStr;
    this._shapeDom.style.backgroundSize = "cover";
    this._shapeDom.style.position = "absolute";
    this._shapeDom.style.borderRadius = "10%";

    document
      .getElementsByClassName(data.shapeAtt.parentClassName)[0]
      .appendChild(this._shapeDom);

    this._opacity = null;
    this._transform = null;

    this.opacity = data.shapeAtt.opacity;
    this.transform = data.shapeAtt.transform;
  }

  set opacity(value) {
    if (value !== this._opacity) {
      this._shapeDom.style.opacity = value + "";
    }
    this._opacity = value;
  }

  get opacity() {
    return this._opacity;
  }

  set transform(value) {
    let transformStr = "";
    if (value.translate3d !== undefined) {
      transformStr = `translate3d(${value.translate3d.x * 0.069}rem, ${
        value.translate3d.y * 0.069
      }rem, ${value.translate3d.z * 0.069}rem)`;
    }

    if (value.scale !== undefined) {
      transformStr += `scale(${value.scale})`;
    }
    this._shapeDom.style.transform = transformStr;
    this._transform = value;
  }

  get transform() {
    return this._transform;
  }
}

// 动画组件
class ShapeAnimComp {
  name: string;
  _opacityAnimMap: any;
  _transformAnimMap: any;
  constructor(data) {
    this.name = "ShapeAnimComp";
    this._opacityAnimMap = data.opacityAnimMap;
    this._transformAnimMap = data.transformAnimMap;
  }

  // 返回根据滚动改变的状态值
  _getStateValue(scrollPos, beginPos, endPos, beginValue, endValue) {
    if (beginValue === endValue) {
      return beginValue;
    }

    const value =
      ((endValue - beginValue) * (scrollPos - beginPos)) / (endPos - beginPos) +
      beginValue;

    return Number(value.toFixed(3));
  }

  // 根据滚动值改变透明度
  changeOpacity(scrollPos, shapeComp) {
    if (this._opacityAnimMap.size === 0) {
      return;
    }

    const keyArr = [...this._opacityAnimMap.keys()].sort((a, b) => a - b);

    const beginPos = keyArr.findLast((item) => item <= scrollPos);
    let beginValue = this._opacityAnimMap.get(beginPos);
    const endPos = keyArr.find((item) => item >= scrollPos);
    let endValue = this._opacityAnimMap.get(endPos);

    if (beginValue === undefined && endValue !== undefined) {
      beginValue = endValue;
    } else if (beginValue !== undefined && endValue === undefined) {
      endValue = beginValue;
    } else if (beginValue === undefined && endValue === undefined) {
      return;
    }

    const opacity = this._getStateValue(
      scrollPos,
      beginPos,
      endPos,
      beginValue,
      endValue
    );
    shapeComp.opacity = opacity;
  }

  // 根据滚动值改变 transform
  changeTransform(scrollPos, shapeComp) {
    // return;
    if (this._transformAnimMap.size === 0) {
      return;
    }
    let transform = {};
    const keyArr = [...this._transformAnimMap.keys()].sort((a, b) => a - b);
    const beginPos = keyArr.findLast((item) => item <= scrollPos);
    let beginValue = this._transformAnimMap.get(beginPos);
    const endPos = keyArr.find((item) => item >= scrollPos);
    let endValue = this._transformAnimMap.get(endPos);
    if (beginValue === undefined && endValue !== undefined) {
      beginValue = endValue;
    } else if (beginValue !== undefined && endValue === undefined) {
      endValue = beginValue;
    } else if (beginValue === undefined && endValue === undefined) {
      return;
    }
    // translate3d
    if (beginValue.translate3d !== undefined) {
      const translate3dx = this._getStateValue(
        scrollPos,
        beginPos,
        endPos,
        beginValue.translate3d.x,
        endValue.translate3d.x
      );
      const translate3dy = this._getStateValue(
        scrollPos,
        beginPos,
        endPos,
        beginValue.translate3d.y,
        endValue.translate3d.y
      );
      const translate3dz = this._getStateValue(
        scrollPos,
        beginPos,
        endPos,
        beginValue.translate3d.z,
        endValue.translate3d.z
      );
      transform.translate3d = {
        x: translate3dx,
        y: translate3dy,
        z: translate3dz
      };
    }
    // scale
    if (beginValue.scale !== undefined) {
      const scale = this._getStateValue(
        scrollPos,
        beginPos,
        endPos,
        beginValue.scale,
        endValue.scale
      );
      transform.scale = scale;
    }
    shapeComp.transform = transform;
  }
}

// 滚动事件组件
class RollEventComp {
  name: string;
  constructor(data) {
    this.name = "RollEventComp";

    window.addEventListener("scroll", (event) => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      let scrollPos = 0;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        scrollPos = 1;
      } else if (scrollTop === 0) {
        scrollPos = 0;
      } else {
        scrollPos = Number(
          (scrollTop / (scrollHeight - clientHeight)).toFixed(3)
        );
      }
      data.cb(scrollPos);
    });
  }
}
onMounted(() => {
  new EffectManager();
});
</script>

<template>
  <div class="logo-animation">
    <div class="logo-animation-top" style="height: 1px"></div>
    <div class="content">
      <div class="effect-content">
        <div class="effect-box">
          <div class="e-icon-box"></div>
        </div>
      </div>
    </div>
    <div class="logo-animation-bottom" style="height: 1px"></div>
  </div>
</template>

<style scoped>
.logo-animation {
  width: 100%;
  height: 100vh;
}
.content {
  height: 100%;
}
.effect-content {
  height: 100%;
}

.effect-box {
  position: sticky;
  top: 0;
  height: 100%;
  /* background-color: #000000; */
  perspective: 800px;
  overflow: hidden;
}

.e-square {
  position: absolute;
  transform-origin: 50% 50%;
  border-radius: 10%;
}

.e-logo {
  position: absolute;
  transform-origin: 50% 50%;
  border-radius: 0vw;
}

.e-icon-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 50%;
  width: 30vw;
  height: 30vw;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 10%;
}
</style>
