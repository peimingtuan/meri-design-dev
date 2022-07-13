import MeriDesign from './components/index';
import './components/index.css';
import './styles/table.styl';

export default ({
    Vue
}) => {
    Vue.use(MeriDesign);
    // document.body.id = 'meriDesign';
    console.log(
        '%c meri-design-dev %c Version 1.5.2',
        'background-color: #0091ff; border-top-left-radius: 2px; border-bottom-left-radius: 2px; line-height: 20px; color: #fff; font-size: 12px;',
        'background-color: #454d54; border-top-right-radius: 2px; border-bottom-right-radius: 2px; line-height: 20px; color: #fff; font-size: 12px;'
    );
}
