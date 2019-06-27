const audioPlayer = () => import('@/components/pages/audio/audioPlayer')

let audioRouter = [{
    path:'/audioPlayer',
    name:'audioPlayer',
    component: audioPlayer
}]

export default audioRouter