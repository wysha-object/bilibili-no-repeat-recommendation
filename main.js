setInterval(() => {
    console.log("start filtering")
    let elements = new Set([
        ...document.getElementsByClassName("feed-card"),
        ...document.getElementsByClassName("bili-feed-card")
    ]);
    for (let e of elements) {
        if ((e.style.display !== "none") && !e.dataset.checked) {
            e.dataset.checked = "true"
            let name
            try {
                name = e.getElementsByClassName("bili-video-card__info--tit")[0].title
            } catch (err) {
                console.log("{")
                console.log("skip:")
                console.log(e)
                console.log("cause:")
                console.log(err)
                console.log("}")
                continue
            }
            chrome.storage.local.get([name]).then((rs) => {
                if (rs[name] === true) {
                    e.style.display = "none";
                    console.log("{")
                    console.log("filtered:")
                    console.log(e)
                    console.log("name:")
                    console.log(name)
                    console.log("}")
                } else {
                    chrome.storage.local.set(
                        {
                            [name]: true
                        }
                    )
                    console.log("{")
                    console.log("added:")
                    console.log(e)
                    console.log("name:")
                    console.log(name)
                    console.log("}")
                }
            }).catch((err) => {
                console.log("{")
                console.log("error on:")
                console.log(e)
                console.log("name:")
                console.log(name)
                console.log("cause:")
                console.log(err)
                console.log("}")
            })
        }
    }
    console.log("filter completed")
}, 1000)
