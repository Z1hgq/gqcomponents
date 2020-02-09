import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./index.less";

const Directory = props => {
  const [Directories, setDirectories] = useState([]);
  useEffect(() => {
    const H = document.querySelectorAll("h2");
    const D = [];
    for (const h of H) {
      const d = {
        id: h.id,
        nodeName: h.nodeName
      };
      D.push(d);
    }
    console.log(D);
    setDirectories(D);
  }, []);
  useEffect(() => {
    const content = document.querySelector("#content_left");
    console.log(content);
    content.addEventListener("scroll", function () {
      for (const d of Directories) {
        const e = document.querySelector(`#${d.id}`);
        if (isInViewPort(e)) {
          active(d.id);
          break;
        }
      }
    });
  }, [Directories, document]);
  // jq方法跳转到锚点
  const link = id => {
    console.log(document.querySelector(`#${id}`).getBoundingClientRect());
    console.log(document.querySelector(`#content_left`).getBoundingClientRect());
    console.log($(`#${id}`).offset().top);
    $(`#content_left`).animate(
      {
        scrollTop: $(`#${id}`).offset().top - 60
      },
      { duration: 500, easing: "swing" }
    );
    return false;
  };
  // scrollIntoView
  const scrollIntoView = id => {
    const e = document.querySelector(`#${id}`);
    e.scrollIntoView(true);
    console.log(id);
  };
  // 元素颜色高亮
  const active = id => {
    const activeD = document.querySelector(`#_${id}`);
    for (const b of activeD.parentNode.parentNode.children) {
      if (b.children[0].id !== `_${id}`) {
        b.children[0].classList.remove("current");
      }
    }
    activeD.classList.add("current");
  };
  // 判断元素是否出现在视窗中
  const isInViewPort = element => {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
  };
  return (
    <div className="directories">
      <ul>
        {Directories.map(d => {
          return (
            <li key={`_${d.id}`}>
              <a
                // href={`#${d.id}`}
                id={`_${d.id}`}
                title={d.id}
                onClick={() => link(d.id)}
              >
                {d.id}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Directory;