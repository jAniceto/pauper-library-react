import React from 'react';


export function getManaHTML(manaCost) {
  const manaDict = {
    '{0}': <i className="ms ms-0 ms-cost"></i>,
    '{1}': <i className="ms ms-1 ms-cost"></i>,
    '{2}': <i className="ms ms-2 ms-cost"></i>,
    '{3}': <i className="ms ms-3 ms-cost"></i>,
    '{4}': <i className="ms ms-4 ms-cost"></i>,
    '{5}': <i className="ms ms-5 ms-cost"></i>,
    '{6}': <i className="ms ms-6 ms-cost"></i>,
    '{7}': <i className="ms ms-7 ms-cost"></i>,
    '{8}': <i className="ms ms-8 ms-cost"></i>,
    '{9}': <i className="ms ms-9 ms-cost"></i>,
    '{10}': <i className="ms ms-10 ms-cost"></i>,
    '{11}': <i className="ms ms-11 ms-cost"></i>,
    '{12}': <i className="ms ms-12 ms-cost"></i>,
    '{13}': <i className="ms ms-13 ms-cost"></i>,
    '{14}': <i className="ms ms-14 ms-cost"></i>,
    '{15}': <i className="ms ms-15 ms-cost"></i>,
    '{16}': <i className="ms ms-16 ms-cost"></i>,
    '{17}': <i className="ms ms-17 ms-cost"></i>,
    '{18}': <i className="ms ms-18 ms-cost"></i>,
    '{19}': <i className="ms ms-19 ms-cost"></i>,
    '{20}': <i className="ms ms-20 ms-cost"></i>,
    '{G}': <i className="ms ms-g ms-cost"></i>,
    '{R}': <i className="ms ms-r ms-cost"></i>,
    '{B}': <i className="ms ms-b ms-cost"></i>,
    '{U}': <i className="ms ms-u ms-cost"></i>,
    '{W}': <i className="ms ms-w ms-cost"></i>,
    '{C}': <i className="ms ms-c ms-cost"></i>,
    '{X}': <i className="ms ms-x ms-cost"></i>,
    '{G/P}': <i className="ms ms-cost ms-p ms-g"></i>,
    '{R/P}': <i className="ms ms-cost ms-p ms-r"></i>,
    '{B/P}': <i className="ms ms-cost ms-p ms-b"></i>,
    '{U/P}': <i className="ms ms-cost ms-p ms-u"></i>,
    '{W/P}': <i className="ms ms-cost ms-p ms-w"></i>,
    '{G/R}': <i className="ms ms-rg ms-split ms-cost"></i>,
    '{G/B}': <i className="ms ms-gb ms-split ms-cost"></i>,
    '{G/U}': <i className="ms ms-gu ms-split ms-cost"></i>,
    '{G/W}': <i className="ms ms-gw ms-split ms-cost"></i>,
    '{R/G}': <i className="ms ms-rg ms-split ms-cost"></i>,
    '{R/B}': <i className="ms ms-rb ms-split ms-cost"></i>,
    '{R/U}': <i className="ms ms-ru ms-split ms-cost"></i>,
    '{R/W}': <i className="ms ms-rw ms-split ms-cost"></i>,
    '{B/R}': <i className="ms ms-br ms-split ms-cost"></i>,
    '{B/G}': <i className="ms ms-bg ms-split ms-cost"></i>,
    '{B/U}': <i className="ms ms-bu ms-split ms-cost"></i>,
    '{B/W}': <i className="ms ms-bw ms-split ms-cost"></i>,
    '{U/R}': <i className="ms ms-ur ms-split ms-cost"></i>,
    '{U/B}': <i className="ms ms-ub ms-split ms-cost"></i>,
    '{U/G}': <i className="ms ms-ug ms-split ms-cost"></i>,
    '{U/W}': <i className="ms ms-uw ms-split ms-cost"></i>,
    '{W/R}': <i className="ms ms-wr ms-split ms-cost"></i>,
    '{W/B}': <i className="ms ms-wb ms-split ms-cost"></i>,
    '{W/U}': <i className="ms ms-wu ms-split ms-cost"></i>,
    '{W/G}': <i className="ms ms-wg ms-split ms-cost"></i>
  }

  let code = []
  if (manaCost) {
    let manaList = manaCost.match(/\{(.*?)\}/g);
    for(var i=0; i<manaList.length; i++){
      code.push(manaDict[manaList[i]])
    }
  }
  return code
}
