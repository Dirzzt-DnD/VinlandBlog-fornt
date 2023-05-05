import avatarImg from '../assets/image/avatar.jpg'
var fallbackAvatar = avatarImg;

/**
 * 获取随机头像 url
 * @returns 头像 url
 */
function getRandomAvatar() {
    let n = parseInt(Math.random() * 100)
    return `https://avatars.githubusercontent.com/u/683682${n}?s=100&v=4`
}

export { fallbackAvatar, getRandomAvatar }