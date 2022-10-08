import { Component, OnInit, Input } from '@angular/core';
import { Diagram } from '../../models/diagram';

@Component({
  selector: 'app-civil',
  templateUrl: './civil.component.html',
  styleUrls: ['./civil.component.scss']
})
export class CivilComponent implements OnInit {

  @Input() data: Diagram;

  public type: string;
  public textFundation: any;
  public colorFundation: any;
  public embargoes: string = '';

  constructor() { }

  ngOnInit() {

    this.type = this.setType();
    this.textFundation = this.handleTextFundations();
    this.colorFundation = this.setColorsFundations();
  }

  handleEmbargoes = (): void => {
    const { realeased } = this.data;
    this.embargoes = realeased;
  }

  setType = (): string => {
    const { type } = this.data;
    return type.includes('CR') ? 'ESTAIADA' : 'AUTOPORTANTE';
  } 

  setColorsFundations = (): any => {
    return this.getColorFundation();
  }

  handleTextFundations = (): any => {
    return this.type === 'ESTAIADA' 
            ? this.getTextFundationEst()
            : this.getTextFundationAut();
  }

  getStyle = (activity) => {
    return {
      'Locação de cavas e pts de fincamentos': 'Locacao',
      'Escavação - (MC-E)': 'Escavacao',
      'Escavação - (MC-F)': 'Escavacao',
      'Escavação - (A)': 'Escavacao',
      'Escavação - (B)': 'Escavacao',
      'Escavação - (C)': 'Escavacao',
      'Escavação - (D)': 'Escavacao',
      'Ancoragem em rocha pérna - (A)': 'Ancoragem',
      'Ancoragem em rocha pérna - (B)': 'Ancoragem',
      'Ancoragem em rocha pérna - (C)': 'Ancoragem',
      'Ancoragem em rocha pérna - (D)': 'Ancoragem',
      'Concreto in loco para (MC-E)': 'Concreto',
      'Concreto in loco para (MC-F)': 'Concreto',
      'Concreto in loco - (A)': 'Concreto',
      'Concreto in loco - (B)': 'Concreto',
      'Concreto in loco - (C)': 'Concreto',
      'Concreto in loco - (D)': 'Concreto',
      'Concreto in loco - concluído' : 'Concreto'
    }[activity] || 'Programado'
  }

  protected getTextFundationEst = (): any => {
    const { foundation_MCE, foundation_MCF,  foundation_A, foundation_B, foundation_C, foundation_D} = this.data;
    return {
      foundation_MCE,
      foundation_MCF,
      foundation_A,
      foundation_B,
      foundation_C,
      foundation_D,
    }
  }

  protected getTextFundationAut = (): any => {
    const { foundation_A, foundation_B, foundation_C, foundation_D } = this.data;
    return {
      foundation_A,
      foundation_B,
      foundation_C,
      foundation_D,
    }
  }

  protected getColorFundation = (): any => {
    const data = this.data.civil;
    const obj = {}
    Object.keys(data).map(key => {
      obj[key] = this.getStyle(data[key])
    });
    
    
    return obj;
  }


}
