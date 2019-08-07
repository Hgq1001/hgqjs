/**
 * @Author:hgq
 * @Describe:
 */

/**
 * 设置cookie
 * @param name cookie的名称
 * @param value cookie的值
 * @param day cookie的过期时间
 */
export function setCookie(name, value, day) {
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        let expires = day * 24 * 60 * 60 * 1000;
        let date = new Date(+new Date() + expires);
        document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString();
    } else {
        document.cookie = name + '=' + escape(value);
    }
}

/**
 * 获取对应名称的cookie
 * @param name cookie的名称
 * @returns {null} 不存在时，返回null
 */
export function getCookie(name) {
    let arr;
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
 * 当值小于10时，首位补0
 * @param str
 * @returns {string}
 */
export function fixZero(str) {
    return str < 10 ? '0' + str : str;
}

/**
 * 获取字符串长度（汉字算两个字符，字母数字算一个）
 * @param str 字符串
 * @returns {number}
 */
export function getByteLen(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        let a = str.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}


/**
 * 获取日期--年月日  2019-06-01
 * @param timeStamp 时间戳
 * @param separator 分隔符
 * @returns {string}
 */
export function getDate(timeStamp = new Date().getTime(), separator = '-') {
    let date = new Date(timeStamp);
    return (date.getFullYear() + separator + fixZero(date.getMonth() + 1) + separator + fixZero(date.getDate()))
        .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
}

/**
 * 获取日期--年月日  时 2019-06-01 10
 * @param timeStamp 时间戳
 * @param separator 分隔符
 * @returns {string}
 */
export function getDateAndHour(timeStamp = new Date().getTime(), separator = '-') {
    let date = new Date(timeStamp);
    return (date.getFullYear() + separator + fixZero(date.getMonth() + 1) + separator + fixZero(date.getDate() + ' ' + fixZero(date.getHours())))
        .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
}

/**
 * 获取日期--年月  2019-06
 * @param timeStamp 时间戳
 * @param separator 分隔符
 * @returns {string}
 */
export function getYearAndMonth(timeStamp = new Date().getTime(), separator = '-') {
    let date = new Date(timeStamp);
    return (date.getFullYear() + separator + fixZero(date.getMonth() + 1))
        .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
}

/**
 * 获取时间 06-13 10:10:10
 * @param timeStamp 时间戳
 * @param separator 分隔符
 * @returns {string}
 */
export function getMonthDayTime(timeStamp = new Date().getTime(), separator = '-') {
    let currentTime = new Date(timeStamp);
    return (fixZero(currentTime.getMonth() + 1) + separator + currentTime.getDate() + ' ' + fixZero(currentTime.getHours()) + ':' + fixZero(currentTime.getMinutes())
        + ':' + fixZero(currentTime.getSeconds()))
        .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
}

/**
 * 获取给定日期后面几天的日期
 * @param date 给定日期
 * @param days 天数
 * @returns {string}
 */
export function addDay(date, days) {
    if (!isNaN(days)) {
        let addTimeStamp = days * 24 * 60 * 60 * 1000;
        let targetDate = new Date(new Date(date).getTime() + addTimeStamp);
        let sDate = (targetDate.getFullYear() + '-' + (targetDate.getMonth() + 1) + '-' + targetDate.getDate())
            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
        return sDate;
    }
}

/**
 * 获取给定日期前面几天的日期
 * @param date 给定日期
 * @param days 天数
 * @returns {string}
 */
export function reduceDay(date, days) {
    if (!isNaN(days)) {
        let addTimeStamp = days * 24 * 60 * 60 * 1000;
        let targetDate = new Date(new Date(date).getTime() - addTimeStamp);
        let sDate = (targetDate.getFullYear() + '-' + (targetDate.getMonth() + 1) + '-' + targetDate.getDate())
            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
        return sDate;
    }
}

/**
 * 生成纯数字数组
 * @param startNum  开始数字
 * @param endNum  结束数字
 * @param interval  数字间隔
 * @returns {Array}
 */
export function createNumArr(startNum, endNum, interval) {
    let arr = [];
    for (let i = startNum; i <= endNum; i++) {
        if (i % interval === 0 && i !== startNum) {
            arr.push(i);
        }
    }
    return arr;
}

/**
 * 数组去重或添加元素
 * @param arr 数组
 * @param val 元素
 * @returns {*}
 */
export function unique(arr, val) {
    let index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    } else {
        arr.push(val);
    }
    return arr;
}


/**
 *  判断一个点是否在多边形内部
 *  @param points 多边形坐标集合
 *  @param testPoint 测试点坐标
 *  返回true为真，false为假
 *  */
export function insidePolygon(points, testPoint) {
    let x = testPoint[0], y = testPoint[1];
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        let xi = points[i][0], yi = points[i][1];
        let xj = points[j][0], yj = points[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}


/**
 *  判断一个点是否在圆的内部
 *  @param point  测试点坐标
 *  @param circle 圆心坐标
 *  @param r 圆半径
 *  返回true为真，false为假
 *  */
export function pointInsideCircle(point, circle, r) {
    if (r === 0) return false;
    let dx = circle[0] - point[0];
    let dy = circle[1] - point[1];
    return dx * dx + dy * dy <= r * r;
}

/**
 * 获取一个区间内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {string}
 */
export function getRandomFrom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

/**
 * 数组深拷贝
 * @param arr  数组
 * @returns {Array}
 */
export function deepCopyArray(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            out[i] = deepCopyArray(arr[i]);
        } else if (arr[i] instanceof Object) {
            out[i] = JSON.parse(JSON.stringify(arr[i]));
        } else {
            out[i] = arr[i];
        }
    }
    return out;
}

/**
 *  对象深拷贝
 * @param obj
 */
export function deepCopyObj(obj) {
    let objCopy = {};
    for (let key in obj) {
        if (obj[key] instanceof Array) {//数组
            objCopy[key] = [];
            for (let i in obj[key]) {
                if (obj[key][i] instanceof Array) {   //数组
                    objCopy[key][i] = JSON.parse(JSON.stringify(obj[key][i]));
                } else if (obj[key][i] instanceof Object) { //对象
                    objCopy[key][i] = Object.assign({}, obj[key][i]);
                } else {
                    objCopy[key][i] = obj[key][i];
                }
            }
        } else if (obj[key] instanceof Object) {    //对象
            objCopy[key] = Object.assign({}, obj[key]);
        } else {
            objCopy[key] = obj[key];
        }
    }
    return objCopy;
}

/**
 * 补全数组
 * @param array 原数组
 * @param columns 每行个数
 * @returns {void|Buffer|any[]|string}
 */
export const completeArrayWithEmpty = (array, columns) => {
    let num = columns * Math.ceil(array.length / columns) - array.length;
    let fillEmptyArr = new Array(num).fill('');
    return array.concat(fillEmptyArr);
};

/**
 * 过滤二维数组
 * @param array 数组
 * @param num 过滤条件
 * @returns {Array} 新数组
 */
export const mergeArray = (array, num) => {
    let copyArray = deepCopyArray(array);
    let result = [];
    copyArray.filter((rowItem, row) => {
        result[row] = [];
        rowItem.filter((item, column) => {
            if ((row + 1) % num === 0 && (column + 1) % num === 0) result[row].push(item);
        });
    });
    return result;
};

/**
 * 多维数组变为1维数组
 * @param arr
 * @returns {*[]}
 */
export const flatten = (arr) => {
    return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x));
};

/**
 * 把base64图片转成2进制
 * @param base64Str  base64字符串
 * @returns {Blob}
 */
export const base64ToBlob = (base64Str) => {
    let parts = base64Str.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
        type: contentType,
    });
};

/**
 * 生成txt文件，并下载
 * @param fileName 文件名
 * @param content txt文本内容
 */
export const createTxtFileToDownload = (fileName, content) => {
    //新建a标签
    let element = document.createElement('a');
    //给a标签设置属性
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);
    //隐藏a标签
    element.style.display = 'none';
    document.body.appendChild(element);
    //下载txt文件
    element.click();
    //移除标签
    document.body.removeChild(element);
};

/**
 * 将base64字符串生成图片，并下载
 * @param fileName  文件名
 * @param base64Str  base64字符串
 */
export const createImgFileToDownload = (fileName, base64Str) => {
    let element = document.createElement('a');
    let blob = base64ToBlob(base64Str); //new Blob([content]);
    let evt = document.createEvent('HTMLEvents');
    //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    evt.initEvent('click', true, true);
    element.download = fileName;
    element.href = URL.createObjectURL(blob);
    element.click();
    //移除标签
    document.body.removeChild(element);
};

/**
 * 判断数据类型
 * @param data  数据
 * @param type  类型
 * @returns {boolean}
 */
export const isType = (data, type) => {
    const typeObj = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Date]': 'date', // Object.prototype.toString.call(new Date())
        '[object RegExp]': 'regExp',
        '[object Map]': 'map',
        '[object Set]': 'set',
        '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
        '[object WeakMap]': 'weakMap',
        '[object Window]': 'window',  // Object.prototype.toString.call(window)
        '[object Error]': 'error', // new Error('1')
        '[object Arguments]': 'arguments',
    };
    let name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
    let typeName = typeObj[name] || '未知类型'; // 匹配数据类型
    return typeName === type; // 判断该数据类型是否为传入的类型
};
