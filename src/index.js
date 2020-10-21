import Quill from 'quill';
import VideoBlot from './video/videoBlot';

const Module = Quill.import('core/module')
const INPUT_ID = 'quill-video-attachment-input';
export default class VideoModel extends Module {
    static register() {
        Quill.register(VideoBlot, true);
    }
    constructor(quill, options = {}) {
        super(quill, options);
        this.buildVideoBtn();
    }

    buildVideoBtn() {
        const toolbars = document.getElementsByClassName('ql-formats');
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ql-attachment';
        btn.innerHTML =
            '<svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="5" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="12" y="3"></rect> <rect class="ql-fill" height="2" width="8" x="5" y="8"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="12"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="12"></rect> </svg>';
        btn.addEventListener('click', () => {
            document.getElementById(INPUT_ID).click();
        });
        toolbars[toolbars.length - 1].appendChild(btn);
        btn = undefined;

        // hidden file input
        let input = document.createElement('input');
        input.type = 'file';
        input.accept =
            '.mp4,.flv,.f4v,.webm,.m4v,.mov,.3gp,.3g2,.rm,.rmvb,.wmv,.avi,.asf,.mpg,.mpeg,.mpe,.ts,.div,.dv,.divx,.vob,.dat,.mkv,.swf,.lavf,.cpk,.dirac,.ram,.qt,.fli,.flc,.mod,.ogv,.ogg';
        input.id = INPUT_ID;
        input.style.display = 'none';
        input.addEventListener('change', event => {
            this.uploadVideo(event.target.files);
        });
        toolbars[toolbars.length - 1].appendChild(input);
        input = undefined;
    }
    uploadVideo(files) {
        const { upload } = this.options;
        if (upload && typeof upload === 'function') {
            upload();
        } else {
            console.error('上传视频方法未定义');
        }
    }

    insert(url) {
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, BlotName, options)，插入图片即可。
        const addRange = this.quill.getSelection();
        // 调用编辑器的 insertEmbed 方法，插入URL
        this.quill.insertEmbed(addRange !== null ? addRange.index : 0, 'simpleVideo', {
            url,
            controls: 'controls',
            width: '30%',
            height: '30%',
        });
        document.getElementById(INPUT_ID).value = '';
    }
}
