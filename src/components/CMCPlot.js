import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, Label, LabelList, XAxis,
} from 'recharts';


class CMCPlot extends React.Component {
  
  render() {

    // Calculate counts of each CMC
    let cmcs = [];
    let cmcCounts = {};
    this.props.mainboardData.forEach(function(card){
      if (card['is_land']) {
        return;
      }
      cmcs.push(parseInt(card['cmc']));  // Saves all cmcs
      let cmc = Math.trunc(card['cmc']);
      if (cmcCounts[cmc]) {
        cmcCounts[cmc] += parseInt(card['quantity']);
      } else {
        cmcCounts[cmc] = parseInt(card['quantity']);
      }
    });

    // Add missing CMCs with zero counts
    const maxCMC = Math.max(...cmcs);
    for (let i = 0; i < maxCMC + 1; i++) {
      if (i in cmcCounts) {
        continue;
      } else {
        cmcCounts[i] = 0;
      }
    }
    
    // Create data list from dict
    let data = [];
    for (const [key, value] of Object.entries(cmcCounts)) {
      data.push({
        cmc: key.toString(), count: value
      })
    }
    
    return (
      <div>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart
            data={data}
            margin={{
              top: 20, right: 0, left: 0, bottom: 40,
            }}
          >
            <XAxis dataKey="cmc">
              <Label value="Converted mana cost distribution" offset={0} position="bottom" />
            </XAxis>
            <Bar dataKey="count" fill="#93A8AC">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

}

export default CMCPlot;
