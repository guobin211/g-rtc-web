# WebRTC技术

## WebRTC业务流程

1.检测设备支持度

2.检测网络

3.打开设备获取数据流

4.创建room等待其他人加入

5.有人加入room，发送offer

6.收到answer->收到offer->发送answer

7.PeerConnection传输stream

8.关闭设备和关闭stream


## mediaDevices

必须使用https才可以使用设备
```shell script

    navigator.mediaDevices.enumerateDevices()
    
    deviceID            设备ID
    
    label               设备的名称
    
    kind                设备的种类
    
    groupID             设备组ID相同说明是同一个物理设备

```

## Video视屏css特效

使用css3的样式属性

```shell script

    filter: blur(30px)

    grayscale
    invert
    sepia
    blur
    hot-rotate
    saturate
    opacity
    brightness
    drop-shadow
```

## 视频约束

```shell script
    1. frameRate帧数
    2. facingMode摄像头
        user
        environment
        left
        right
    3. resizeMode
```

## 音频约束

```shell script
    1. volume声音大小
    2. sampleRate采样率
    3. echoCancellation回音消除
    4. autoGainControl增强
    5. noiseSuppression降噪
    6. latency延迟大小
    7. deviceID设备切换
    8. groupID同一个物理设备
```


