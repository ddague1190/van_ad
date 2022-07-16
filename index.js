const aws_url = (num) => `https://econolinepictures.s3.amazonaws.com/IMG-65${num}.jpg`

let arr = [38, 39, 40, 41, 42, 44, 46, 48, 50, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 66, 68, 73, 76, 77, 81, 84, 85]
const loadingBox = document.createElement('div');
loadingBox.innerHTML = 'loading...';
const gallery = document.getElementById('image_list');
let loading = false;

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target.image;
            const id = entry.target.id;
            image.src = aws_url(id);
            if (arr.length > 0 && !loading) {
                addOneImage()
                loading=true
            }
        }
    })
}

const observer = new IntersectionObserver(callback, {
    rootMargin: '50px'
})


function renderImage(image, wrapper) {
    loading = false
    wrapper.innerHTML = '';
    wrapper.append(image);
}

function addOneImage() {
    [currNum, ...rest] = arr
    arr = rest
    const image = document.createElement('img');
    const wrapper = document.createElement('div');
    image.addEventListener('load', (e) => renderImage(e.target, wrapper))
    wrapper.append(image);
    wrapper.classList.add('gallery-item');
    wrapper.id = currNum;
    wrapper.image = image;
    wrapper.innerHTML = 'loading...';
    observer.observe(wrapper);
    gallery.append(wrapper);
}


addOneImage()



