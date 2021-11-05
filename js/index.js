const recordBtn = document.querySelector('.record-btn')
const stopRecord = document.querySelector('.record-stop')

recordBtn.addEventListener('click', async () => {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })

  const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') ? 'video/webm; codecs=vp9' : 'video/mp4;'
  
  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  })

  let chunks = []
  mediaRecorder.addEventListener('dataavailable', (e) => {
    chunks.push(e.data)
  })
  

  mediaRecorder.addEventListener('stop', () => {
    let blob = new Blob(chunks, {
      type: chunks[0].type
    })

    let url = URL.createObjectURL(blob)

    let video = document.querySelector('.video')
    video.src = url

    let a = document.createElement('a')
    a.href = url
    a.download = url
    a.download = 'video.mp4'
    a.click()
  })

  stopRecord.addEventListener('click', () => {
    mediaRecorder.stop()
  })
  mediaRecorder.start()
 
})

