/**
 * 所有组件打包
 */

import './components/base';
// import Button from './components/Button';
// import DropDownButton from './components/DropDownButton';
import Modal from './components/Modal';
// import Drawer from './components/Drawer';
// import Toggle from './components/Toggle';
// import Dropdown from './components/Dropdown';
import DropGroup from './components/DropGroup';
import DropGroupFrame from './components/DropGroupFrame';
// import Select from './components/Select';
// import SelectScreen from './components/SelectScreen';
// import Badge from './components/Badge';
// import Divider from './components/Divider';
// import Tabs from './components/Tabs';
import Breadcrumb from './components/Breadcrumb';
import PickerTime from './components/PickerTime';
import PickerDate from './components/PickerDate';
// import PickerMonth from './components/PickerMonth';
import PickerMonthDay from './components/PickerMonthDay';
 import Tree from './components/Tree';
// import TreeBi from './components/TreeBi';
// import TopNotification from './components/TopNotification';
// import Tag from './components/Tag';
// import Transfer from './components/Transfer';
 import TransferSelectModal from './components/TransferSelectModal';
import Checkbox from './components/Checkbox';
// import CheckboxGroup from './components/CheckboxGroup';
// import CustomTreeSelectEnergy from './components/CustomTreeSelectEnergy';
// import Radio from './components/Radio';
// import RadioGroup from './components/RadioGroup';
// import Avatar from './components/Avatar';
// import FileUpload from './components/FileUpload';
// import ImageUpload from './components/ImageUpload';
// import Table from './components/Table';
import TableGrid from './components/TableGrid';
// import THead from './components/THead';
// import TableTree from './components/TableTree';
// import Pagination from './components/Pagination';
// import Popover from './components/Popover';
import TreeSelect from './components/TreeSelect';
import Cascader from './components/Cascader';
import EmptyStatus from './components/EmptyStatus';
// import Input from './components/Input';
// import InputNumber from './components/InputNumber';
import Icon from './components/Icon';
import PTree from './components/PTree';
// import PTreeSelect from './components/PTreeSelect';

import MButton from './components/MButton';
import MCascade from './components/MCascade';
import MSelect from './components/MSelect';

// 组合组件
// import Headers from './components/Headers';

// 函数式组件
// import Message from './components/Message';
import Loading from './components/Loading';
// import IndexLoading from './components/IndexLoading';
// import PopoverTip from './components/PopoverTip';

// 未公开组件
// import TransferMini from './components/TransferMini';
// import Shake from './components/Shake';
import SidebarCustom from './components/SidebarCustom';
// import TreeStage from './components/TreeStage';
// import CarouselText from './components/CarouselText';

// 自定义指令
import Tooltip from './components/Tooltip';

// 业务组件
// import Editable from './components/Editable';
import EditableList from './components/EditableList';
// import TreePersonOrg from './components/TreePersonOrg';
// import TransferEquipment from './components/TransferEquipment';
import CascaderSearchList from './components/CascaderSearchList';
// import ViewTable from './components/ViewTable';
// import PickerTimeEndOf24 from './components/PickerTimeEndOf24';
// import PickerTime2400 from './components/PickerTime2400';
// import MultipleSearchInput from './components/MultipleSearchInput';
// import FrameMenu from './components/FrameMenu';

const Components = {
    // Button,
    // DropDownButton,
    Modal,
    // Drawer,
    // Toggle,
    // Dropdown,
    DropGroup,
    DropGroupFrame,
    // Select,
    // SelectScreen,
    // Badge,
    // Divider,
    // Tabs,
    Breadcrumb,
    PickerTime,
    PickerDate,
    // PickerMonth,
    PickerMonthDay,
     Tree,
    // TreeBi,
    // TopNotification,
    // Tag,
    // Transfer,
     TransferSelectModal,
    // Avatar,
    // FileUpload,
    // ImageUpload,
    // Table,
    TableGrid,
    // THead,
    // TableTree,
    // Pagination,
    PTree,
    // PTreeSelect,

    Checkbox,
    // CheckboxGroup,
    // CustomTreeSelectEnergy,
    // Radio,
    // RadioGroup,

    Icon,
    // Popover,
    TreeSelect,
    Cascader,
    EmptyStatus,
    //
    // Input,
    // InputNumber,

    // 组合组件
    // Headers,

    // 函数式组件
    // Message,
    Loading,
    // IndexLoading,
    // PopoverTip,

    // 未公开组件
    // TransferMini,
    // Shake,
    SidebarCustom,
    // TreeStage,
    // CarouselText,

    // 业务组件
    // Editable,
    EditableList,
    // TreePersonOrg,
    // TransferEquipment,
    CascaderSearchList,
    // ViewTable,
    /* PickerTimeEndOf24, */
    // PickerTime2400,
    // MultipleSearchInput,
    // FrameMenu,

    MButton,
    MCascade,
    MSelect
};

const install = Vue => Object.keys(Components).forEach(name => {
    Vue.directive('ptitle', { inserted: Tooltip, unbind: Tooltip.remove });

    // if (name === 'Message') Vue.prototype.$message = Message;
    // else if (name === 'Loading') Vue.prototype.$loading = Loading;
    // else if (name === 'IndexLoading') Vue.prototype.$indexLoading = IndexLoading;
    // else if (name === 'PopoverTip') Vue.prototype.$popoverTip = PopoverTip;
    // else Vue.component(name, Components[name]);
    if (name === 'Loading') Vue.prototype.$loading = Loading;
    else Vue.component(name, Components[name]);
});

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

Components.install = install;

export default Components;
