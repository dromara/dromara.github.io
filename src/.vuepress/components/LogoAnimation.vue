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

<script setup lang="ts">
import { onMounted } from "vue";
const dromaraBase64 =
  "data:image/webp;base64,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";
const animData = {
  domArr: [
    // 杂乱的正方形
    {
      widthStr: "11vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/easy_trans.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/sa-token.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/forest.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/Jpom.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/hmily.webp')",
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
        "url('/assets/img/logo-animation/image-combiner.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/northstar.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/redisfront.webp')",
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
      widthStr: "5vw",
      backgroundColorStr: "",
      backgroundImageStr: "url('/assets/img/logo-animation/sureness.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/liteFlow.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/go-view.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/hertzbeat.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/soul.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/gobrs-async.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/myth.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/MaxKey.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/TLog.webp')",
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
        "url('/assets/img/logo-animation/RuoYi-Vue-Plus.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/mendmix.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/Disjob.webp')",
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
      backgroundImageStr: "url('/assets/img/logo-animation/hutool.webp')",
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
      backgroundImageStr: `url('${dromaraBase64}')`,
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
function executeEffectManager (data = animData): void {
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

// 单体
class Entity {
  _compMap: Map<any, any>;
  constructor () {
    this._compMap = new Map();
  }

  addComp (comp: ShapeComp | ShapeAnimComp | RollEventComp): void {
    this._compMap.set(comp.name, comp);
  }

  getComp (compName: string): any {
    return this._compMap.get(compName);
  }
}

interface TransformValue {
  translate3d?: {
    x: number
    y: number
    z: number
  }
  scale?: number
}
// 形状组件
class ShapeComp {
  name: string;
  _shapeDom: HTMLDivElement;
  _opacity: number | null;
  _transform: TransformValue | null;
  constructor (data: { shapeAtt: any }) {
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

  set opacity (value: number | null) {
    if (value !== this._opacity) {
      this._shapeDom.style.opacity = String(value);
    }
    this._opacity = value;
  }

  get opacity (): number | null {
    return this._opacity;
  }

  set transform (value: TransformValue | null) {
    if (value == null) {
      return;
    }
    let transformStr = "";
    if (value.translate3d !== undefined) {
      transformStr = `translate3d(${value.translate3d.x * 0.069}rem, ${
        value.translate3d.y * 0.069
      }rem, ${value.translate3d.z * 0.069}rem)`;
    }

    if (value.scale !== undefined) {
      transformStr += `scale(${String(value.scale)})`;
    }
    this._shapeDom.style.transform = transformStr;
    this._transform = value;
  }

  get transform (): TransformValue | null {
    return this._transform;
  }
}

// 动画组件
class ShapeAnimComp {
  name: string;
  _opacityAnimMap: any;
  _transformAnimMap: any;
  constructor (data) {
    this.name = "ShapeAnimComp";
    this._opacityAnimMap = data.opacityAnimMap;
    this._transformAnimMap = data.transformAnimMap;
  }

  // 返回根据滚动改变的状态值
  _getStateValue (scrollPos, beginPos, endPos, beginValue, endValue): number {
    if (beginValue === endValue) {
      return beginValue;
    }

    const value =
      (((endValue as number) - (beginValue as number)) *
        ((scrollPos as number) - (beginPos as number))) /
        ((endPos as number) - (beginPos as number)) +
      (beginValue as number);

    return Number(value.toFixed(3));
  }

  // 根据滚动值改变透明度
  changeOpacity (scrollPos, shapeComp): void {
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
  changeTransform (scrollPos, shapeComp): void {
    // return;
    if (this._transformAnimMap.size === 0) {
      return;
    }
    const transform = {};
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
  constructor (data) {
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

function ensureDomElement (): void {
  // 检查元素是否已经存在
  if (document.querySelector(".e-square") == null) {
    // 如果元素不存在，则创建新元素
    executeEffectManager();
  }
}
onMounted(() => {
  ensureDomElement();
});
</script>

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
